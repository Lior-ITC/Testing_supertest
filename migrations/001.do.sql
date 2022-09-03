CREATE TABLE IF NOT EXISTS products (
  id            VARCHAR(36) DEFAULT (UUID()),
  name          VARCHAR(200) NOT NULL,
  price         INT NOT NULL,
  created_date  DATE DEFAULT (CURRENT_DATE),
  PRIMARY KEY (id)
);