--Eliminar DB para evitar errores
DROP DATABASE biblioteca;

--Parte 2
--1) Crear DB
CREATE DATABASE biblioteca;

--Conectarse a la DB
\c biblioteca;

--Crear las tablas
CREATE TABLE autor(id_autor INT PRIMARY KEY, nombre VARCHAR(8), apellido VARCHAR(11), nacimiento INT, muerte INT, tipo_autor VARCHAR(10));
CREATE TABLE libro(ISBN VARCHAR(15) PRIMARY KEY, titulo VARCHAR(25), paginas INT, cod_autor INT, dias_prestamos INT);
CREATE TABLE autoresLibro(libre_ISBN VARCHAR(20) REFERENCES libro(ISBN), autor_id INT REFERENCES autor(id_autor));
CREATE TABLE socio(rut VARCHAR(10) PRIMARY KEY, nombre VARCHAR(30), apellido VARCHAR(30), direccion VARCHAR(50) UNIQUE, comuna VARCHAR(30), telefono INT UNIQUE);
CREATE TABLE historial_prestamo(id_prestamo INT PRIMARY KEY, socio_rut VARCHAR(12) REFERENCES socio(rut), isbn_libro VARCHAR(20) REFERENCES libro(ISBN), fecha_de_prestamo DATE, fecha_de_devolucion DATE);

--2) Se deben insertar los registros en las tablas correspondientes
--Tabla autor
INSERT INTO autor (id_autor, nombre, apellido, nacimiento, muerte, tipo_autor) VALUES (3, 'Jose', 'Salgado', 1968, 2020, 'PRINCIPAL');
INSERT INTO autor (id_autor, nombre, apellido, nacimiento, tipo_autor) VALUES (4, 'Ana', 'Salgado', 1972, 'COAUTOR');
INSERT INTO autor (id_autor, nombre, apellido, nacimiento, tipo_autor) VALUES (1, 'Andrés', 'Ulloa', 1982, 'PRINCIPAL');
INSERT INTO autor (id_autor, nombre, apellido, nacimiento, muerte, tipo_autor) VALUES (2, 'Sergio', 'Mardones', 1950, 2012, 'PRINCIPAL');
INSERT INTO autor (id_autor, nombre, apellido, nacimiento, tipo_autor) VALUES (5, 'Martín', 'Porta', 1976, 'PRINCIPAL');

--Tabla libro
INSERT INTO libro (ISBN, titulo, paginas, cod_autor, dias_prestamos) VALUES ('111-1111111-111', 'Cuentos de terror', 344, 3, 7);
INSERT INTO libro (ISBN, titulo, paginas, dias_prestamos, cod_autor) VALUES ('111-1111I11-111', 'Cuentos de terror', 344, 7, 4);
INSERT INTO libro (ISBN, titulo, paginas, cod_autor, dias_prestamos) VALUES ('222-2222222-222', 'Poesías contemporáneas', 167, 1, 7);
--Estos libros tienen más días de préstamo para que la consulta sobre la multa tenga casos equilibrados entre multados y no multados
INSERT INTO libro (ISBN, titulo, paginas, cod_autor, dias_prestamos) VALUES ('333-3333333-333', 'Historia de Asia', 511, 2, 14);
INSERT INTO libro (ISBN, titulo, paginas, cod_autor, dias_prestamos) VALUES ('444-4444444-444', 'Manual de mecánica', 298, 5, 14);

--Tabla socio
INSERT INTO socio(rut, nombre, apellido, direccion, comuna, telefono) VALUES ('11111111-1', 'Juan', 'Soto', 'Avenida 1', 'Santiago', 911111111);
INSERT INTO socio(rut, nombre, apellido, direccion, comuna, telefono) VALUES ('22222222-2', 'Ana', 'Perez', 'Pasaje 2', 'Santiago', 922222222);
INSERT INTO socio(rut, nombre, apellido, direccion, comuna, telefono) VALUES ('33333333-3', 'Sandra', 'Aguilar', 'Avenida 2', 'Santiago', 933333333);
INSERT INTO socio(rut, nombre, apellido, direccion, comuna, telefono) VALUES ('44444444-4', 'Esteban', 'Jerez', 'Avenida 3', 'Santiago',944444444);
INSERT INTO socio(rut, nombre, apellido, direccion, comuna, telefono) VALUES ('55555555-5', 'Silvana', 'Muñoz', 'Pasaje 3', 'Santiago', 955555555);

--Tabla historial de préstamos
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (1, '11111111-1', '111-1111111-111', '2020-01-20', '2020-01-27');
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (2, '55555555-5', '222-2222222-222', '2020-01-20', '2020-01-30');
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (3, '33333333-3', '333-3333333-333', '2020-01-22', '2020-01-30');
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (4, '44444444-4', '444-4444444-444', '2020-01-23', '2020-01-30');
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (5, '22222222-2', '111-1111111-111', '2020-01-27', '2020-02-04');
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (6, '11111111-1', '444-4444444-444', '2020-01-31', '2020-02-12');
INSERT INTO historial_prestamo (id_prestamo, socio_rut, isbn_libro, fecha_de_prestamo, fecha_de_devolucion) VALUES (7, '33333333-3', '222-2222222-222', '2020-01-31', '2020-02-12');

--3) Realizar las siguientes consultas
--a) Mostrar todos los libros que posean menos de 300 páginas
SELECT libro.titulo, libro.paginas FROM libro WHERE paginas < 300;

--b) Mostrar todos los autores que hayan nacido después del 01-01-1970
SELECT autor.nombre, autor.apellido, autor.nacimiento FROM autor WHERE nacimiento >= 1970;

--c) ¿Cuál es el libro más solicitado?
SELECT isbn_libro, COUNT(*) FROM historial_prestamo GROUP BY isbn_libro LIMIT 1;

--d) Multas
SELECT historial_prestamo.socio_rut, (historial_prestamo.fecha_de_devolucion - historial_prestamo.fecha_de_prestamo) - dias_prestamos AS diferencia, ((historial_prestamo.fecha_de_devolucion - historial_prestamo.fecha_de_prestamo) - dias_prestamos)*100 AS Multa FROM historial_prestamo INNER JOIN libro ON historial_prestamo.isbn_libro = libro.ISBN WHERE ((historial_prestamo.fecha_de_devolucion - historial_prestamo.fecha_de_prestamo) - dias_prestamos) > 0;

-- SELECT * FROM autor;
-- SELECT * FROM libro;
-- SELECT * FROM autoresLibro;
-- SELECT * FROM socio;
-- SELECT * FROM historial_prestamo;