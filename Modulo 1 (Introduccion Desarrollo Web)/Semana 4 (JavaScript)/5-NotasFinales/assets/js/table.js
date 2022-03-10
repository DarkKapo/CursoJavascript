//Inicio datos usuario
//primera fila (nombre)
document.write("<div class='container-fluid'>")
document.write("<div class='row'>")
document.write("<div class='col'>")
document.write("<h4>Nombre:</h4> ")
document.write("</div>")
document.write("<div class='col'>")
document.write(nombre + " " + apellido)
document.write("</div>")
document.write("<div class='col'>")
document.write("</div>")
document.write("<div class='col'>")
document.write("</div>")
document.write("</div>")
document.write("</div>")

//segunda fila (carrera)
document.write("<div class='container-fluid'>")
document.write("<div class='row'>")
document.write("<div class='col'>")
document.write("<h4>Carrera:</h4> ")
document.write("</div>")
document.write("<div class='col'>")
document.write(carrera)
document.write("</div>")
document.write("<div class='col'>")
document.write("</div>")
document.write("<div class='col'>")
document.write("</div>")
document.write("</div>")
document.write("</div>")
document.write("<br>")
//Fin datos usuario

//Inicio tabla
document.write("<div class='container-fluid'>") //container de la tabla
document.write("<table class='table'>")
document.write("<thead class='thead-dark'>") //color del head de la tabla

//Inicio fila 1 (ramo, notas y promedio)
document.write("<tr>")
document.write("<th scope='col'><h4>Ramo</h4></th>")
document.write("<th scope='col'><h4>Nota 1</h4></th>")
document.write("<th scope='col'><h4>Nota 2</h4></th>")
document.write("<th scope='col'><h4>Nota 3</h4></th>")
document.write("<th scope='col'><h4>Promedio</h4></th>")
document.write("</tr>")
document.write("</thead>")
document.write("<tbody>")
//Fin fila1

//Inicio fila 2 (nombre del ramo 1 y sus notas)
document.write("<tr>")
document.write("<th scope='row'><h4>" + ramo1 + "</h4></th>")
document.write("<td><h4>" + nota1Ramo1 + "</h4></td>")
document.write("<td><h4>" + nota2Ramo1 + "</h4></td>")
document.write("<td><h4>" + nota3Ramo1 + "</h4></td>")
document.write("<td><h4>" + promedioRamo1 + "</h4></td>")
document.write("</tr>")
//Fin fila 2

//Inicio fila 3 (nombre del ramo 2 y sus notas)
document.write("<tr>")
document.write("<th scope='row'><h4>" + ramo2 + "</h4></th>")
document.write("<td><h4>" + nota1Ramo2 + "</h4></td>")
document.write("<td><h4>" + nota2Ramo2 + "</td>")
document.write("<td><h4>" + nota3Ramo2 + "</td>")
document.write("<td><h4>" + promedioRamo2 + "</td>")
document.write("</tr>")
//Fin fila 3

//Inicio fila 4 (nombre del ramo 3 y sus notas)
document.write("<tr>")
document.write("<th scope='row'><h4>" + ramo3 + "</th>")
document.write("<td><h4>" + nota1Ramo3 + "</td>")
document.write("<td><h4>" + nota2Ramo3 + "</td>")
document.write("<td><h4>-</td>")
document.write("<td><h4>-</td>")
document.write("</tr>")
document.write("</tbody>")
document.write("</table>")
document.write("</div>")
//Fin fila 4
//Fin tabla

//Mensaje abajo de la tabla
document.write("<div class='container-fluid'>")
document.write("Para aprobar el ramo " + ramo3 + " con nota " + notaAprobar + ", necesitas obtener un " + notaParaAprobar + " en la nota 3")
document.write("</div>")