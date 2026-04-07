DROP DATABASE IF EXISTS bxpense_dev;
CREATE DATABASE bxpense_dev;
USE bxpense_dev;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(55) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO users (username, password, image_url)
VALUES ("蔡英豪", "placeholder", "placeholder"),
	("Pani", "placeholder", "placeholder");

CREATE TABLE accounts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    balance INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)

);
INSERT INTO accounts (user_id, name, image_url, balance)
VALUES (1, "現金", "placeholder", 500000);

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO categories (user_id, name, image_url)
VALUES (1, "食物", "placeholder");


CREATE TABLE records(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    account_id INT,
    category_id INT,
    type ENUM('expense', 'income') NOT NULL,
    amount INT NOT NULL,
    remarks VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
INSERT INTO records (user_id, account_id, category_id, type, amount, remarks)
VALUES ( 1, 1, 1, "expense", 100, "午餐");


CREATE TABLE saving_goals(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    name VARCHAR(255),
    target_date DATE,
    goal_amount INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE saving_goal_records(
    id INT AUTO_INCREMENT PRIMARY KEY,
    saving_goal_id INT,

    date DATE,
    amount INT DEFAULT  0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (saving_goal_id) REFERENCES saving_goals(id)
);

