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

-- Fungsi untuk memperbarui kolom updatedAt saat ada perubahan pada baris
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fungsi untuk mengatur kolom username berdasarkan email setelah insert
CREATE OR REPLACE FUNCTION set_username_from_email()
RETURNS TRIGGER AS $$
BEGIN
    NEW.username = split_part(NEW.email, '@', 1);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk memperbarui kolom updatedAt saat ada perubahan pada baris
CREATE TRIGGER update_updated_at
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk mengatur kolom username berdasarkan email setelah insert
CREATE TRIGGER set_username
AFTER INSERT ON "user"
FOR EACH ROW
EXECUTE FUNCTION set_username_from_email();

CREATE OR REPLACE FUNCTION update_kyc_level_1_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Membuat trigger untuk memperbarui updatedAt di kyc_level_1
CREATE TRIGGER trg_update_kyc_level_1_updated_at
AFTER INSERT OR UPDATE ON kyc_level_1
FOR EACH ROW
EXECUTE FUNCTION update_kyc_level_1_updated_at();

-- Membuat fungsi untuk memperbarui isVerified di tabel user
CREATE OR REPLACE FUNCTION update_user_is_verified()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."isApproved" = true THEN
        UPDATE "user" SET "isVerified" = true WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Membuat trigger untuk memperbarui isVerified di tabel user
CREATE TRIGGER trg_update_user_is_verified
AFTER INSERT OR UPDATE ON kyc_level_1
FOR EACH ROW
EXECUTE FUNCTION update_user_is_verified();
