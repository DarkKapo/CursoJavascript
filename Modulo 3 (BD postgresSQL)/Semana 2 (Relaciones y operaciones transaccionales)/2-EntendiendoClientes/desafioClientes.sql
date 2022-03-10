--Eliminar BD
--DROP DATABASE main;

--Crear BD
--CREATE DATABASE main;

--Conectar a la BD
\c main;

--1) Cargar el respaldo de la base de datos unidad2.sql

--psql -U rodrigo main < unidad2.sql

--2) El cliente usuario01 ha realizado la siguiente compra: producto: producto9; cantidad: 5; fecha: fecha del sistema

--Inicio
BEGIN TRANSACTION;

    --Pasos: Agrega compra, detalle y actualiza stock
    INSERT INTO compra(id, cliente_id, fecha) VALUES (33, 1, now());
    INSERT INTO detalle_compra(id, producto_id, compra_id, cantidad) VALUES(43, 9, 33, 5);
    UPDATE producto SET stock = stock - 5 WHERE producto.id = 9;

    --Comprobar si se descuenta
    SELECT * FROM producto WHERE producto.id = 9;
    --Rollback para finalizar operacion
    ROLLBACK;

COMMIT

--2) El cliente usuario02 ha realizado la siguiente compra: producto: producto1, producto 2, producto 8; cantidad: 3 de cada producto; fecha: fecha del sistema
BEGIN TRANSACTION;

    --Pasos: Agrega compra
    INSERT INTO compra(id, cliente_id, fecha) VALUES (34, 2, now());

    --Agregar detalles producto 1, 2 y 8
    INSERT INTO detalle_compra(id, producto_id, compra_id, cantidad) VALUES (44, 1, 34, 3);
    UPDATE producto SET stock = stock - 3 WHERE producto.id = 1;

    INSERT INTO detalle_compra(id, producto_id, compra_id, cantidad) VALUES (45, 2, 34, 3);
    UPDATE producto SET stock = stock - 3 WHERE producto.id = 2;
    SAVEPOINT save1;

    INSERT INTO detalle_compra(id, producto_id, compra_id, cantidad) VALUES (46, 8, 34, 3);
    UPDATE producto SET stock = stock - 3 WHERE producto.id = 8;
    ROLLBACK TO save1;

    --Consultar tabla producto para validar los stocks
    SELECT * FROM producto WHERE producto.id IN(1, 2, 8);

COMMIT;

--4) Realizar las siguientes consultas
BEGIN TRANSACTION;

    --a) Deshabilitar el AUTOCOMMIT
    \echo AUTOCOMMIT off;

    --b) Insertar un nuevo cliente
    INSERT INTO cliente(id, nombre, email) VALUES (11, 'usuario011', 'usuario011@hotmail.com');

    --c) Confirmar que fue agregado en la tabla cliente
    SELECT * FROM cliente WHERE cliente.id = 11;

    --d) Realizar un ROLLBACK
    ROLLBACK;

    --e) Confirmar que se restauró la información, sin considerar la inserción del punto b
    SELECT * FROM cliente;

    --f) Habilitar de nuevo el AUTOCOMMIT
    \echo AUTOCOMMIT on;
    
COMMIT;