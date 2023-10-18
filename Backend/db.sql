-- Active: 1696534710624@@127.0.0.1@3306@apiuser
CREATE TABLE users (
    userId INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    passwordHash VARCHAR(128) NOT NULL,
    constraint PK_users PRIMARY KEY (userId)
);

CREATE TABLE addresses (
    addressId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    streetAddress VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zipCode VARCHAR(10) NOT NULL,
    constraint PK_addresses PRIMARY KEY (addressId),
    constraint FK_users_addresses FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE
);

CREATE TABLE userSessions (
    sessionId INT NOT NULL AUTO_INCREMENT,
    userId INT,
    loginTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    constraint PK_userSessions PRIMARY KEY (sessionId),
    constraint FK_users_userSessions FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE
);