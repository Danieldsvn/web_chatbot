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
    id INT NOT NULL auto_increment,
    user_id INT,    
    chat_history TEXT,
    timestamp TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id)
      REFERENCES users (id)
);

SET SQL_SAFE_UPDATES = 0;