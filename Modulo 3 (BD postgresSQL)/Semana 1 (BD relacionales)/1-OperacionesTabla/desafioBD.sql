--Eliminar base de datos para evitar errores
DROP DATABASE Posts;

--Desafio parte 1
--1) Crear BD Posts
CREATE DATABASE Posts;

--Conectarse a la BD
\c posts;

--2) Crear tabla Post

CREATE TABLE Post(id SERIAL, nombre VARCHAR(25) NOT NULL, fecha DATE DEFAULT (now()), contenido VARCHAR(255), descripcion VARCHAR(30), PRIMARY KEY (id));

--3) Insertar 3 post, 2 para el usuario "Pamela" y uno para "Carlos"
INSERT INTO Post(nombre, contenido, descripcion) VALUES ('Pamela', 'Iniciando el curso', 'Primer día');
INSERT INTO Post(nombre, contenido, descripcion) VALUES ('Pamela', 'Me llamo Pamela', 'Presentación');
INSERT INTO Post(nombre, contenido, descripcion) VALUES ('Carlos', 'No puedo ingresar a la clase', 'Reclamo');

--4) Modificar la tabla post, agregando la columna título
ALTER TABLE Post ADD titulo VARCHAR(20);

--5) Agregar título a las publicaciones ya ingresadas
UPDATE Post SET titulo = 'Post 1' WHERE id = 1;
UPDATE Post SET titulo = 'Post 2' WHERE id = 2;
UPDATE Post SET titulo = 'Post 3' WHERE id = 3;

--6) Insertar 2 post para el usuario "Pedro"
INSERT INTO Post(nombre, contenido, descripcion, titulo) VALUES ('Pedro', 'Necesito la dirección del zoom', 'ayuda', 'consulta');
INSERT INTO Post(nombre, contenido, descripcion, titulo) VALUES ('Pedro', 'Tengo la direccion', 'gracias', 'resuelto');

--7) Eliminar el post de Carlos
DELETE from Post WHERE id = 3;

--8) Ingresar un nuevo post para el usuario "Carlos"
INSERT INTO Post(nombre, contenido, descripcion, titulo) VALUES ('Carlos', 'Me borraron el post', 'estoy enojado', 'Reclamo');

--Parte 2
--1) Crear una nueva tabla llamada “comentarios”
CREATE TABLE comentarios(id SMALLINT, fecha DATE DEFAULT (now()), hora TIME DEFAULT (now()), contenido VARCHAR(255), FOREIGN KEY (id) REFERENCES Post(id));

--2) Crear 2 comentarios para el post de "Pamela" y 4 para "Carlos"
INSERT INTO comentarios(id, contenido) VALUES (1, 'Respondiendo al post de Pamela');
INSERT INTO comentarios(id, contenido) VALUES (1, 'Respondiendo nuevamente a post');
INSERT INTO comentarios(id, contenido) VALUES (6, 'Carlos responde');
INSERT INTO comentarios(id, contenido) VALUES (6, 'Carlos no quiere responder');
INSERT INTO comentarios(id, contenido) VALUES (6, 'Carlos respondió, estaba ocupado');
INSERT INTO comentarios(id, contenido) VALUES (6, 'Gracias Carlos por responder');

--3) Crear un nuevo post para "Margarita"
INSERT INTO Post(nombre, contenido, descripcion, titulo) VALUES ('Margarita', 'link de la grabación de la clase', 'Link', 'Post 1');

--4) Ingresar 5 comentarios para el post de Margarita
INSERT INTO comentarios(id, contenido) VALUES (7, 'Respuesta Margarita');
INSERT INTO comentarios(id, contenido) VALUES (7, 'Nadie responde');
INSERT INTO comentarios(id, contenido) VALUES (7, 'Esperaré a mañana');
INSERT INTO comentarios(id, contenido) VALUES (7, 'Llevo 3 días esperando');
INSERT INTO comentarios(id, contenido) VALUES (7, 'Me respondieron');

--Mostrar tabla
SELECT * FROM Post;
SELECT * FROM comentarios;