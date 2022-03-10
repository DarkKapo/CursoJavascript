//Agregar el logo al programa
//Ingreso de datos
var nombre = prompt("Ingresa tu nombre: ", "Rodrigo") 
var apellido = prompt("Ingresa tu apellido: ", "Quezada")
var carrera = prompt("Ingresa nombre de la carrera: ", "Desarrollo web")

//Ingreso del primer ramo y sus 3 notas
var ramo1 = prompt("Ingresa nombre del primer ramo ", "Programación")
var nota1Ramo1 = prompt("Ingrese nota 1 [" + ramo1 + "]:", "5") 
var nota2Ramo1 = prompt("Ingrese nota 2 [" + ramo1 + "]:", "5")
var nota3Ramo1 = prompt("Ingrese nota 3 [" + ramo1 + "]:", "6")

//Ingreso del segundo ramo y sus 3 notas
var ramo2 = prompt("Ingresa nombre del segundo ramo ", "Ruby") 
var nota1Ramo2 = prompt("Ingrese nota 1 [" + ramo2 + "]:", "4.5")
var nota2Ramo2 = prompt("Ingrese nota 2 [" + ramo2 + "]:","5.2")
var nota3Ramo2 = prompt("Ingrese nota 3 [" + ramo2 + "]:", "5.7")

//Ingreso del tercer ramo y sus 2 notas
var ramo3 = prompt("Ingresa nombre del tercer ramo ", "Inglés")
var nota1Ramo3 = prompt("Ingrese nota 1 [" + ramo3 + "]:", "3.56")
var nota2Ramo3 = prompt("Ingrese nota 2 [" + ramo3 + "]:", "3.58")

//Ingreso nota de aprobación
var notaAprobar = prompt("Ingrese nota para aprobar el ramo", "4")

//Calculando promedio ramo 1...
//Primero debemos convertir el texto a número (se aplica en todos los ramos)
nota1Ramo1 = parseFloat(nota1Ramo1)
nota2Ramo1 = parseFloat(nota2Ramo1)
nota3Ramo1 = parseFloat(nota3Ramo1)

//Cálculo promedio ramo 1
var promedioRamo1 = (nota1Ramo1 + nota2Ramo1 + nota3Ramo1)/3

//Formulas para mostrar el resultado en 2 decimales
promedioRamo1 = promedioRamo1*100
promedioRamo1 = Math.round(promedioRamo1)
promedioRamo1 = promedioRamo1/100

//Convertir las notas del ramo 2 a float
nota1Ramo2 = parseFloat(nota1Ramo2)
nota2Ramo2 = parseFloat(nota2Ramo2)
nota3Ramo2 = parseFloat(nota3Ramo2)

//Cálculo promedio ramo 2
var promedioRamo2 = (nota1Ramo2 + nota2Ramo2 + nota3Ramo2)/3

//Formulas para mostrar el resultado en 2 decimales
promedioRamo2 = promedioRamo2*100
promedioRamo2 = Math.round(promedioRamo2)
promedioRamo2 = promedioRamo2/100

//Transformar a número para calcular la nota de aprobación
notaAprobar = parseFloat(notaAprobar) //Nota de aprobación
nota1Ramo3 = parseFloat(nota1Ramo3)
nota2Ramo3 = parseFloat(nota2Ramo3)

//Calcular nota que necesita la persona para aprobar
var notaParaAprobar = (notaAprobar*3) - (nota1Ramo3 + nota2Ramo3)

notaParaAprobar = parseFloat(notaParaAprobar)

//Formulas para mostrar el resultado en 2 decimales
notaParaAprobar = notaParaAprobar*100
notaParaAprobar = Math.round(notaParaAprobar)
notaParaAprobar = notaParaAprobar/100