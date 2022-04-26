--Eliminar BD
DROP DATABASE bancosolar;

--Crear BD
CREATE DATABASE bancosolar;

--Conectar BD
\c bancosolar;

--Crear tabla usuarios
CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50), balance FLOAT CHECK (balance >= 0), estado boolean);

--Crear tabla Transferencia
CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));
