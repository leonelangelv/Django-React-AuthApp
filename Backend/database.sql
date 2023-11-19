-- Active: 1696534710624@@127.0.0.1@3306@auth_users

CREATE TABLE Countries (
  countryId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  constraint PK_countries PRIMARY KEY (countryId)
);

CREATE TABLE provinces (
  provinceId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  countryId INT NOT NULL ,
  constraint PK_provinces PRIMARY KEY (provinceId),
  constraint FK_countries_provinces FOREIGN KEY (countryId) REFERENCES countries (countryId) ON UPDATE CASCADE
);

CREATE TABLE users (
  userId INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15) NOT NULL, 
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  provinceId INT,
  constraint PK_users PRIMARY KEY (userId),
  constraint FK_countries_users FOREIGN KEY (provinceId) REFERENCES provinces (provinceId) ON UPDATE CASCADE
);

DROP Table users;



