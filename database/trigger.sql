-- FUNCTION CHANGE ROLES AFTER KYC APPROVED
CREATE OR REPLACE FUNCTION update_user_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."isApproved" = true THEN
        UPDATE "user" SET roles = 'FUNDRAISER' WHERE user_id = NEW.user_id;
    ELSIF NEW."isApproved" = false THEN
        UPDATE "user" SET roles = 'USER' WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER CHANGE ROLES AFTER KYC APPROVED
CREATE TRIGGER after_kyc_level_2_update
AFTER UPDATE ON kyc_level_2
FOR EACH ROW
WHEN (OLD."isApproved" IS DISTINCT FROM NEW."isApproved")
EXECUTE FUNCTION update_user_role();

-- FUNCTION CHECK KYC LEVEL 2 APPROVAL BEFORE INSERT CAMPAIGN
CREATE OR REPLACE FUNCTION check_kyc_level_2_approval()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT "isApproved" FROM kyc_level_2 WHERE user_id = NEW.user_id) = false THEN
        RAISE EXCEPTION 'KYC Level 2 for this user has not been approved yet';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER CHECK KYC LEVEL 2 APPROVAL BEFORE INSERT CAMPAIGN
CREATE TRIGGER before_campaign_insert
BEFORE INSERT ON campaign
FOR EACH ROW
EXECUTE FUNCTION check_kyc_level_2_approval();

-- FUNCTION INSERT INVESTMENT DATA AFTER TRANSACTION SUCCESS
CREATE OR REPLACE FUNCTION insert_investment_data()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.transaction_type = 'INVESTMENT' AND NEW.transaction_status = 'SUCCESS' THEN
        INSERT INTO investment (investment_id, campaign_id, user_id, amount, investment_date)
        VALUES (uuid_generate_v4(), NEW.campaign_id, NEW.user_id, NEW.amount, NEW.trans_date);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER INSERT INVESTMENT DATA AFTER TRANSACTION SUCCESS
CREATE TRIGGER after_successful_investment
AFTER INSERT ON "transaction"
FOR EACH ROW
WHEN (NEW.transaction_status = 'SUCCESS')
EXECUTE FUNCTION insert_investment_data();
