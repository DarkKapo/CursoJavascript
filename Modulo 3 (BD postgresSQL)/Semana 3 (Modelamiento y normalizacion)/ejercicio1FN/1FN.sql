--Descomponer los elementos de la factura (1FN.JPG)
Factura(#numeroFactura, fechaFactura, nombrePaciente, #numeroPaciente,
        direccion, comuna, CodSalud, ciudad, {numeroItem, nombreItem, valorItem},
        subtotal, impuesto, total);

--primera forma normal (1FN)
--Eliminar grupos repetitivos (los q están) entre llaves

--Crear una nueva tabla para el grupo repetitivo
--FacturaItem est'a asociado a un número de factura
FacturaItem(#numeroFactura, #numeroItem, nombreItem, valorItem)

--Volver a dibujar la tabla (imagen 2FN.jpg)

--Actualizar tabla factura, eliminamos temporalmente subtotal, impuesto, total
Factura(#numeroFactura, fechaFactura, nombrePaciente, #numeroPaciente,
        direccion, comuna, CodSalud, ciudad);

--Resultado en imagen 3FN.jpg

--Redibujar la tabla como la imagen 4FN.jpg

--Aplicar segunda forma normal (2FN)

--FacturaItem tiene 2 claves, depende lo que diga el cliente es lo que debemos hacer
FacturaItem(#numero_factura, #numero_item, nombre_item, valor_item)

--Para este caso, se divide la tabla en 2 de la siguiente forma (numero_item es el link a la otra tabla)
FacturaItem(#numero_factura, numero_item)
Item(#numero_item, nombre_item, valor_item)

--Resultado en imagen 5FN.jpg

--Factura tambien tiene 2 claves, debemos volver a revisar qu'e atributos dependen de cada clave)
Factura(#numero_factura, fecha_factura, nombre_paciente,
        #numero_paciente, direccion, comuna, ciudad, codigo_sistema_salud)

--Separar las tablas acorde a la dependencia de cada clave (numero_paciente es el link a la otra tabla)
Factura(#numero_factura, fecha_factura, numero_paciente)
Paciente(#numero_paciente, nombre_paciente, direccion, comuna, ciudad, codigo_sistema_salud)

--Resultado en imagen 6FN.JPG y 7FN.JPG

--Aplicar tercera forma normal (3FN)
--Debemos eliminar las dependencias funcionales transitivas

--En tabla Paciente, la comuna es ajena al paciente (comuna es una entidad independiente con sus propios atributos)
--por lo tanto debemos separar esas tablas y relacionarlas con PK y FK
Paciente(#numero_paciente, nombre_paciente, direccion codigo_sistema_salud, idComuna)
Comuna(#idComuna, nombreComuna, ciudad)

--Con la misma lógica anterior, separamos ciudad de comuna
Ciudad(#idCiudad, nombreCiudad)
Comuna(#idComuna, nombreComuna, ciudad, idCiudad)

--Resultado en imagen 9FN.JPG coresponde a als tablas para crearlas en VS