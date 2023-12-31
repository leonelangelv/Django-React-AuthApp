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

CREATE TABLE recoveryPasswordCode (
  username VARCHAR(15) NOT NULL,
  code VARCHAR(6) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  constraint PK_recoveryPasswordCode PRIMARY KEY (username)
);

DELIMITER //
CREATE EVENT delete_expired_codes
ON SCHEDULE EVERY 70 SECOND
DO
  DELETE FROM recoveryPasswordCode WHERE createdAt < NOW() - INTERVAL 1 MINUTE;
//
DELIMITER ;


---> Countries
  INSERT INTO Countries (name, `urlImg`) VALUES 
  ('Argentina'),
  ('Brasil'),
  ('Chile'),
  ('Colombia'),
  ('Ecuador'),
  ('Perú'),
  ('Uruguay'),
  ('Venezuela'),
  ('México'),
  ('España');

---> provinces
  INSERT INTO provinces (name, countryId) VALUES 
  ('Buenos Aires', 1),
  ('Córdoba', 1),
  ('Santa Fe', 1),
  ('Mendoza', 1),
  ('Tucumán', 1),
  ('Entre Ríos', 1),
  ('Salta', 1),
  ('Chaco', 1),
  ('Corrientes', 1),
  ('Misiones', 1),
  ('São Paulo', 2),
  ('Minas Gerais', 2),
  ('Río de Janeiro', 2),
  ('Bahía', 2),
  ('Pernambuco', 2),
  ('Ceará', 2),
  ('Paraná', 2),
  ('Río Grande do Sul', 2),
  ('Piauí', 2),
  ('Maranhão', 2),
  ('Santiago', 3),
  ('Antofagasta', 3),
  ('Valparaíso', 3),
  ('O Higgins', 3),
  ('Maule', 3),
  ('Bío Bío', 3),
  ('Araucanía', 3),
  ('Los Lagos', 3),
  ('Aysén', 3),
  ('Magallanes', 3),
  ('Bogotá', 4),
  ('Antioquia', 4),
  ('Valle del Cauca', 4),
  ('Cundinamarca', 4),
  ('Santander', 4),
  ('Atlántico', 4),
  ('Bolívar', 4),
  ('Boyacá', 4),
  ('Caldas', 4),
  ('Magdalena', 4),
  ('Guayas', 5),
  ('Pichincha', 5),
  ('Manabí', 5),
  ('Azuay', 5),
  ('El Oro', 5),
  ('Loja', 5),
  ('Tungurahua', 5),
  ('Imbabura', 5),
  ('Cotopaxi', 5),
  ('Chimborazo', 5),
  ('Lima', 6),
  ('Piura', 6),
  ('La Libertad', 6),
  ('Arequipa', 6),
  ('Cajamarca', 6),
  ('Junín', 6),
  ('Cusco', 6),
  ('Lambayeque', 6),
  ('Puno', 6),
  ('Áncash', 6),
  ('Montevideo', 7),
  ('Canelones', 7),
  ('Maldonado', 7),
  ('Rocha', 7),
  ('Treinta y Tres', 7),
  ('Cerro Largo', 7),
  ('Rivera', 7),
  ('Tacuarembó', 7),
  ('Artigas', 7),
  ('Salto', 7),
  ('Caracas', 8),
  ('Zulia', 8),
  ('Miranda', 8),
  ('Carabobo', 8),
  ('Anzoátegui', 8),
  ('Bolívar', 8),
  ('Nueva Esparta', 8),
  ('Mérida', 8),
  ('Táchira', 8),
  ('Aragua', 8),
  ('Ciudad de México', 9),
  ('Estado de México', 9),
  ('Veracruz', 9),
  ('Jalisco', 9),
  ('Puebla', 9),
  ('Guanajuato', 9),
  ('Chiapas', 9),
  ('Nuevo León', 9),
  ('Michoacán', 9),
  ('Oaxaca', 9),
  ('Madrid', 10),
  ('Cataluña', 10),
  ('Andalucía', 10),
  ('Comunidad Valenciana', 10),
  ('Galicia', 10),
  ('Castilla y León', 10),
  ('País Vasco', 10),
  ('Castilla-La Mancha', 10),
  ('Canarias', 10),
  ('Región de Murcia', 10);
