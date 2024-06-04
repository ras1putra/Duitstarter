CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE user_roles AS ENUM ('USER', 'FUNDRAISER', 'ADMIN');

CREATE TABLE IF NOT EXISTS "user"
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(200) NOT NULL,
    avatar bytea,
    roles user_roles NOT NULL DEFAULT 'USER',
    "isPublic" boolean NOT NULL DEFAULT true,
    isVerified boolean NOT NULL DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE kyc_status_enum AS ENUM ('PENDING', 'REVIEWED');

CREATE TABLE IF NOT EXISTS kyc_level_1
(
    kyc_level_1_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL UNIQUE,
    full_name VARCHAR(200) NOT NULL,
    jenis_kelamin VARCHAR(16) NOT NULL,
    nik VARCHAR(16) NOT NULL,
    tanggal_lahir date NOT NULL,
    status kyc_status_enum NOT NULL DEFAULT 'PENDING',
    "isApproved" boolean,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "statusUpdate" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS foto_dokumen
(
    foto_dokumen_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    foto_ktp_depan bytea NOT NULL,
    foto_ktp_belakang bytea NOT NULL,
    foto_selfie bytea NOT NULL,
    kyc_level_1_id uuid NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS address
(
    address_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    address VARCHAR(200) NOT NULL,
    kecamatan VARCHAR(40) NOT NULL,
    kota VARCHAR(40) NOT NULL,
    provinsi VARCHAR(40) NOT NULL,
    kode_pos VARCHAR(40) NOT NULL,
    kyc_level_1_id uuid NOT NULL UNIQUE
);



CREATE TABLE IF NOT EXISTS kyc_level_2
(
    kyc_level_2_id uuid NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE,
    surat_skck bytea NOT NULL,
    surat_domisili bytea NOT NULL,
    surat_keterangan_bank bytea NOT NULL,
    status kyc_status_enum NOT NULL DEFAULT 'PENDING',
    "isApproved" boolean NOT NULL DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updateStatus" VARCHAR(256)
);

CREATE TYPE tipe_usaha_enum AS ENUM ('MIKRO', 'KECIL', 'MENENGAH', 'BESAR');
CREATE TYPE jenis_usaha_enum AS ENUM ('PERTANIAN', 'PERDAGANGAN', 'JASA', 'INDUSTRI', 'MAKANAN', 'MINUMAN', 'TEKNOLOGI', 'KREATIF', 'LAINNYA');

CREATE TABLE IF NOT EXISTS campaign
(
    campaign_id uuid NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL,
    nama_usaha VARCHAR(200) NOT NULL,
    deskripsi_usaha VARCHAR(512) NOT NULL,
    logo bytea,
    "isApproved" boolean NOT NULL DEFAULT FALSE,
    "isPublished" boolean NOT NULL DEFAULT FALSE,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    tipe_usaha tipe_usaha_enum,
    jenis_usaha jenis_usaha_enum
);

CREATE TABLE IF NOT EXISTS alamat_usaha
(
    alamat_usaha_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL UNIQUE,
    address VARCHAR(512),
    kecamatan VARCHAR(40),
    kota VARCHAR(40),
    provinsi VARCHAR(40),
    kode_pos VARCHAR(12),
    lat DECIMAL(15,12),
    lgn DECIMAL(15,12)
);

CREATE TABLE IF NOT EXISTS contact_usaha
(
    contact_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL UNIQUE,
    telepon_wa VARCHAR(24),
    fax VARCHAR(24),
    email VARCHAR(64),
    website VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS social_media_usaha
(
    social_media_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid UNIQUE,
    team_id uuid,
    facebook VARCHAR(200),
    instagram VARCHAR(200),
    twitter VARCHAR(200),
    telegram VARCHAR(200),
    tiktok VARCHAR(200),
    linkedin VARCHAR(200),
    CONSTRAINT chk_campaign_team CHECK (
        (campaign_id IS NOT NULL AND team_id IS NULL) OR 
        (campaign_id IS NULL AND team_id IS NOT NULL)
    )
);

CREATE TABLE IF NOT EXISTS legalitas_usaha
(
    legalitas_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL UNIQUE,
    tanggal_dibentuk date,
    pemilik VARCHAR(200),
    nib VARCHAR(200),
    nik_pic VARCHAR(20),
    file_perizinan bytea
);

CREATE TABLE IF NOT EXISTS crowdfunding
(
    crowdfunding_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL UNIQUE,
    target_raise bigint,
    equity_dijual numeric,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    fund_raised bigint NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS data_rekening
(
    rekening_id uuid NOT NULL PRIMARY KEY,
    nama_rekening VARCHAR(200),
    nama_bank VARCHAR(200),
    nomor_rekening VARCHAR(200),
    crowdfunding_id uuid NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS highlight_product
(
    highlight_product_id integer NOT NULL PRIMARY KEY,
    crowdfunding_id uuid NOT NULL UNIQUE,
    highlight text
);

CREATE TABLE IF NOT EXISTS product_information
(
    product_info_id integer NOT NULL PRIMARY KEY,
    crowdfunding_id uuid NOT NULL UNIQUE,
    link_video VARCHAR(200),
    product_info text
);

CREATE TABLE IF NOT EXISTS team_campaign
(
    team_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL,
    nama_lengkap VARCHAR NOT NULL,
    jabatan VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS campaign_update
(
    update_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL,
    update_title VARCHAR(256),
    update_detail text,
    published_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document
(
    document_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS document_legal
(
    document_legal_id uuid NOT NULL PRIMARY KEY,
    document_id uuid NOT NULL,
    nama_dokumen VARCHAR(200),
    file bytea
);

CREATE TABLE IF NOT EXISTS document_proposal
(
    document_proposal_id uuid NOT NULL PRIMARY KEY,
    document_id uuid NOT NULL,
    nama_dokumen VARCHAR(200),
    file bytea
);

CREATE TABLE IF NOT EXISTS discussion
(
    discussion_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivity" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    message text NOT NULL,
    "like" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS replies_discussion
(
    replie_id uuid NOT NULL PRIMARY KEY,
    discussion_id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    message text NOT NULL,
    "like" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pesan_campaign
(
    pesan_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL,
    pesan text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS investment
(
    investment_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL,
    user_id uuid NOT NULL,
    amount bigint NOT NULL,
    investment_date timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refund
(
    refund_id uuid NOT NULL PRIMARY KEY,
    amount bigint NOT NULL,
    nama_bank VARCHAR(200),
    nomor_bank VARCHAR(200),
    alasan_refund text,
    "isAproved" boolean DEFAULT FALSE,
    "statusUpdate" text,
    "updatedAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id uuid NOT NULL,
    "isConfirmed" boolean NOT NULL DEFAULT false,
    approved_amount bigint,
    reason_reduce text
);

CREATE TABLE IF NOT EXISTS community
(
    community_id uuid NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS community_membership
(
    community_membership_id uuid NOT NULL PRIMARY KEY,
    community_id uuid NOT NULL UNIQUE,
    user_id uuid NOT NULL,
    "joinedDate" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exited_date timestamp with time zone
);

CREATE TABLE IF NOT EXISTS community_proposal
(
    proposal_com_id uuid NOT NULL PRIMARY KEY,
    setuju integer NOT NULL DEFAULT 0,
    tidak_setuju integer NOT NULL DEFAULT 0,
    abstain integer NOT NULL DEFAULT 0,
    title VARCHAR(200) NOT NULL,
    deskripsi text,
    file_tambahan bytea,
    amount bigint NOT NULL DEFAULT 0,
    community_id uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS user_voted
(
    user_voted_id uuid NOT NULL PRIMARY KEY,
    community_proposal_id uuid NOT NULL,
    user_id uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS community_chat
(
    chat_id uuid NOT NULL PRIMARY KEY,
    community_proposal_id uuid NOT NULL,
    chat text NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE transaction_type_enum AS ENUM ('INVESTMENT', 'REFUND');
CREATE TYPE transaction_status_enum AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

CREATE TABLE IF NOT EXISTS "transaction"
(
    transaction_id uuid NOT NULL PRIMARY KEY,
    transaction_type transaction_type_enum,
    transaction_status transaction_status_enum DEFAULT 'PENDING',
    trans_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    payment VARCHAR(200),
    amount bigint,
    campaign_id uuid,
    user_id uuid
);

ALTER TABLE IF EXISTS kyc_level_1
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS foto_dokumen
    ADD FOREIGN KEY (kyc_level_1_id)
    REFERENCES kyc_level_1 (kyc_level_1_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS address
    ADD FOREIGN KEY (kyc_level_1_id)
    REFERENCES kyc_level_1 (kyc_level_1_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS kyc_level_2
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS campaign
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS alamat_usaha
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS contact_usaha
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS social_media_usaha
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS social_media_usaha
    ADD FOREIGN KEY (team_id)
    REFERENCES team_campaign (team_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS legalitas_usaha
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS crowdfunding
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS data_rekening
    ADD FOREIGN KEY (crowdfunding_id)
    REFERENCES crowdfunding (crowdfunding_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS highlight_product
    ADD FOREIGN KEY (crowdfunding_id)
    REFERENCES crowdfunding (crowdfunding_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS product_information
    ADD FOREIGN KEY (crowdfunding_id)
    REFERENCES crowdfunding (crowdfunding_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS team_campaign
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS campaign_update
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS document
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS document_legal
    ADD FOREIGN KEY (document_id)
    REFERENCES document (document_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS document_proposal
    ADD FOREIGN KEY (document_id)
    REFERENCES document (document_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS discussion
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS discussion
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS replies_discussion
    ADD FOREIGN KEY (discussion_id)
    REFERENCES discussion (discussion_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS pesan_campaign
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS investment
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS investment
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS refund
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS community_membership
    ADD FOREIGN KEY (community_id)
    REFERENCES community (community_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS community_membership
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS community_proposal
    ADD FOREIGN KEY (community_id)
    REFERENCES community (community_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS user_voted
    ADD FOREIGN KEY (community_proposal_id)
    REFERENCES community_proposal (proposal_com_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS user_voted
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS community_chat
    ADD FOREIGN KEY (community_proposal_id)
    REFERENCES community_proposal (proposal_com_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS community_chat
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "transaction"
    ADD FOREIGN KEY (user_id)
    REFERENCES "user" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "transaction"
    ADD FOREIGN KEY (campaign_id)
    REFERENCES campaign (campaign_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;