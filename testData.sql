DROP SCHEMA IF EXISTS MotrGram;

CREATE SCHEMA MotrGram;

USE MotrGram;

CREATE TABLE Users (
	userID INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(100) UNIQUE KEY,
	password VARCHAR(100),
	email varchar(200),
	zipcode INT,
	birthyear int	
);

INSERT INTO Users (username, password, email, zipcode, birthyear) values (
	'connork',
	'password',
	'connor@email.com',
	'92078',
	'1993'
);
