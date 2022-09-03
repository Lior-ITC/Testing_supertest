ALTER TABLE users ADD COLUMN role VARCHAR(10) DEFAULT 'user';

INSERT INTO users (email, password_hash, role) VALUES ('admin@example.com', '$2y$12$ryO3bjpkCj58OwbmABdFLO1qDP0lvyeUmtetUmOjwaflLMBGIGArq', 'admin');