DROP DATABASE IF EXISTS Chatbot;

CREATE DATABASE Chatbot;

USE Chatbot;

CREATE TABLE users (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE chat_history (
    id INT AUTO_INCREMENT,
    user_id INT,    
    timestamp TIMESTAMP,
    chat_history TEXT
    PRIMARY KEY(id)
    FOREIGN KEY (user_id)
      REFERENCES users (id)
);

SET SQL_SAFE_UPDATES = 0;