drop database likeme;

create database likeme;

\c likeme;

CREATE TABLE posts (id SERIAL, usuario varchar(25), url varchar(1000), descripcion varchar(255), likes INT);