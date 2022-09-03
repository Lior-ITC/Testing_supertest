CREATE TABLE IF NOT EXISTS users (
  id                 VARCHAR(36) DEFAULT (UUID()),
  email              VARCHAR(255) NOT NULL UNIQUE,
  password_hash      VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);