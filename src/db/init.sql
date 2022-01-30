-- CREATE DATABASE IF NOT EXISTS patient_db;

-- USE patient_db;

-- DROP TABLE IF EXISTS patients;

-- CREATE TABLE patients (
--   id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
--   first_name   VARCHAR(255) DEFAULT NULL,
--   last_name    VARCHAR(255) DEFAULT NULL,
--   email        VARCHAR(255) DEFAULT NULL,
--   phone_number VARCHAR(255) DEFAULT NULL,
--   address      VARCHAR(255) DEFAULT NULL,
--   diagnosis    VARCHAR(255) DEFAULT NULL,
--   image_url    VARCHAR(255) DEFAULT NULL,
--   created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (id),
--   CONSTRAINT UQ_patient UNIQUE_EMAIL (email)
-- );