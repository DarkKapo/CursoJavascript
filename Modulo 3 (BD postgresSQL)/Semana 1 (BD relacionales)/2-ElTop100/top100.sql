--Eliminar base de datos
DROP DATABASE peliculas;

--1) Crear base de datos
CREATE DATABASE peliculas;

--Conectarse
\c peliculas;

--Crear las 2 tablas
CREATE TABLE peliculas(id INT UNIQUE, pelicula VARCHAR(70), año_estreno INT, director VARCHAR(40), PRIMARY KEY (id));
CREATE TABLE reparto(id INT, actores VARCHAR(50), FOREIGN KEY(id) REFERENCES peliculas(id));

--2) Cargar los archivos
\copy peliculas FROM 'peliculas.csv' csv header;
\copy reparto FROM 'reparto.csv' csv;

--3) Obtener el id de "titanic"
SELECT id, pelicula as nombre FROM peliculas WHERE pelicula='Titanic';

--4) Listar a todos los actores que aparecen en la película "Titanic"
SELECT actores FROM reparto WHERE id=2;

--5) Consultar en cuántas películas del top 100 participa Harrison Ford
SELECT COUNT(id) as total FROM reparto WHERE actores='Harrison Ford';

--6) Indicar las películas estrenadas entre los años 1990 y 1999 ordenadas por título de manera ascendente
SELECT año_estreno as estreno, pelicula FROM peliculas WHERE año_estreno BETWEEN 1990 AND 1999 ORDER BY pelicula ASC;

--7) Muestre los títulos con su longitud, la longitud debe ser nombrado para la consulta como “longitud_titulo”
SELECT pelicula, LENGTH(pelicula) as longuitud_titulo FROM peliculas;

--8) Consultar cual es la longitud más grande entre todos los títulos de las películas
SELECT MAX(LENGTH(pelicula)) as longuitud_titulo FROM peliculas;