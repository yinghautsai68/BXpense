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
VALUES ("pani", "$2b$10$TXTi84Riik9D4I9lVuGPP.6XUEuq7qQJBCzRaB.HkrMGJmPlmZTNG", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/products/1775711545283-SnapInsta.to_642800192_17954497605067836_5123513395128580387_n.jpg");

CREATE TABLE accounts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    balance INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE  CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id)

);
INSERT INTO accounts (user_id, name, image_url, balance)
VALUES (1, "現金", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/products/1775655585454-glorious_keyboard.png", 500000),
(1, "銀行", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/products/1775655585454-glorious_keyboard.png", 500000);

CREATE TABLE categories(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO categories (name, image_url)
VALUES ("wifi_bill", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-wifi-bill.png"),
( "water_bill", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/cateogry-water-bill.png"),
( "electric_bill", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-electric-bill.png"),
( "rent_bill", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-rent-bill.png"),
("bag", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-bag.png"),
("clothes", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-clothes.png"),
("cosmetics", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-cosmetics.png"),
("travel", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-travel.png"),
("entertainment", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-entertainment.png"),
("game", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-game.png"),
("workout", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-workout.png"),
("education", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-education.png"),
("phone", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-phone.png"),
("meat", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-meat.png"),
("fruit", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-fruit.png"),
("vegetable", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-vegetable.png"),
("social", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-social.png"),
("daily_use", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-daily-use.png"),
("transportation", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-transporation.png"),
("drink", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-drink.png"),
("food", "https://bxpense-bucket.s3.us-east-1.amazonaws.com/category-icons/category-food.png");


CREATE TABLE records(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    account_id INT,
    
    category_id INT,
    type ENUM('expense', 'income') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    remarks VARCHAR(255),
	record_date DATETIME,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
INSERT INTO records (user_id, account_id, category_id, type, amount, remarks, record_date)
VALUES ( 1, 1, 1, "expense", 100, "午餐","2026-04-01 12:30:30"),
( 1, 1, 1, "expense", 50, "晚餐","2026-04-01 18:30:30"),
( 1, 1, 1, "expense", 200, "消夜","2026-04-01 19:30:30"),
( 1, 1, 1, "expense", 300, "Snacks","2026-04-01 20:30:30"),
( 1, 1, 1, "expense", 100, "午餐","2026-04-02 12:30:30"),
( 1, 1, 1, "expense", 150, "晚餐","2026-04-02 18:30:30");



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

