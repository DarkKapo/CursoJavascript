//Estructura radiología, Requerimiento 1
let radiologia = [
    {hora: '11:00', especialista: 'Ignacio Schulz', paciente: 'Francisca Rojas', rut: '9878782-1', prevision: 'Fonasa'},
    {hora: '11:30', especialista: 'Federico Subercaseaux', paciente: 'Pamela Estrada', rut: '15345241-3', prevision: 'Isapre'},
    {hora: '15:00', especialista: 'Fernando Wurthz', paciente: 'Armando Luna', rut: '16445345-9', prevision: 'Isapre'},
    {hora: '15:30', especialista: 'Ana Maria Godoy', paciente: 'Manuel Godoy', rut: '17666419-0', prevision: 'Fonasa'},
    {hora: '16:00', especialista: 'Patricia Suazo', paciente: 'Ramon Ulloa', rut: '14989389-K', prevision: 'Fonasa'}
];

//Estructura traumatología
let traumatologia = [
    {hora: '8:00', especialista: 'Maria Paz Altuzarra', paciente: 'Paula Sanchez', rut: '15554774-5', prevision: 'Fonasa'},
    {hora: '10:00', especialista: 'Raul Araya', paciente: 'Angélica Navas', rut: '15444147-9', prevision: 'Isapre'},
    {hora: '10:30', especialista: 'Maria Arriagada', paciente: 'Ana Klapp', rut: '17879423-9', prevision: 'Isapre'},
    {hora: '11:00', especialista: 'Alejandro Badilla', paciente: 'Felipe Mardones', rut: '1547423-6', prevision: 'Isapre'},
    {hora: '11:30', especialista: 'Cecilia Budnik', paciente: 'Diego Marre', rut: '16554741-K', prevision: 'Fonasa'},
    {hora: '12:00', especialista: 'Arturo Cavagnaro', paciente: 'Cecilia Mendez', rut: '9747535-8', prevision: 'Isapre'},
    {hora: '12:30', especialista: 'Andres Kanacri', paciente: 'Marcial Suazo', rut: '11254785-5', prevision: 'Isapre'}
];

//Estructura dental
var dental = [
    {hora: '8:30', especialista: 'Andrea Zuñiga', paciente: 'Marcela Retamal', rut: '11123425-6', prevision: 'Isapre'},
    {hora: '11:00', especialista: 'Maria Pia Zañartu', paciente: 'Angel Muñoz', rut: '9878789-2', prevision: 'Isapre'},
    {hora: '11:30', especialista: 'Scarlett Witting', paciente: 'Mario Kast', rut: '7998789-5', prevision: 'Fonasa'},
    {hora: '13:00', especialista: 'Francisco Von Teuber', paciente: 'Karin Fernandez', rut: '18887662-K', prevision: 'Fonasa'},
    {hora: '13:30', especialista: 'Eduardo Viñuela', paciente: 'Hugo Sanchez', rut: '17665461-4', prevision: 'Fonasa'},
    {hora: '14:00', especialista: 'Raquel Villaseca', paciente: 'Ana Sepulveda', rut: '14441281-0', prevision: 'Isapre'}
];

//Retorna nombre del paciente y previsión del primer objeto
var extraerDatos = (array) => {
    let datoP, datoU;
    //extrae el primer (datoP) y último (datoU) dato
    for (let i = 0; i < array.length; i++) 
    {
        if(i == 0)
            datoP = array[i].paciente + ' - ' + array[i].prevision;
        else if(i == array.length - 1)
            datoU = array[i].paciente + ' - ' + array[i].prevision;
    }

    return datoP + ' | ' + datoU;
}

//Crea los encabezados de cada tabla
var texto1 = "<tr><th>Hora</th><th>Especialista</th><th>Paciente</th><th>Rut</th><th>Previsión</th></tr>";
var texto2 = "<tr><th>Hora</th><th>Especialista</th><th>Paciente</th><th>Rut</th><th>Previsión</th></tr>";
var texto3 = "<tr><th>Hora</th><th>Especialista</th><th>Paciente</th><th>Rut</th><th>Previsión</th></tr>";

//Imprime los datos solicitados (Requerimiento 2)
document.write(`<h2>Radiología</h2>`);
document.write(`<p>Primera atención: ${extraerDatos(radiologia)}</p>`);

document.write(`<h2>Traumatología</h2>`);
document.write(`<p>Primera atención: ${extraerDatos(traumatologia)}</p>`);

document.write(`<h2>Dental</h2>`);
document.write(`<p>Primera atención: ${extraerDatos(dental)}</p>`);

//Mostrar los datos en una tabla (Requerimiento 3)
//Radiologia
for (var i = 0; i < radiologia.length; i++) {
    texto1 += `<tr>
                <td>${radiologia[i].hora}</td>
                <td>${radiologia[i].especialista}</td>
                <td>${radiologia[i].paciente}</td>
                <td>${radiologia[i].rut}</td>
                <td>${radiologia[i].prevision}</td>
            </tr>`;
}
//Traumatología
for (var i = 0; i < traumatologia.length; i++) {
    texto2 += `<tr>
                <td>${traumatologia[i].hora}</td>
                <td>${traumatologia[i].especialista}</td>
                <td>${traumatologia[i].paciente}</td>
                <td>${traumatologia[i].rut}</td>
                <td>${traumatologia[i].prevision}</td>
            </tr>`;
}
//Dental
for (var i = 0; i < dental.length; i++) {
    texto3 += `<tr>
                <td>${dental[i].hora}</td>
                <td>${dental[i].especialista}</td>
                <td>${dental[i].paciente}</td>
                <td>${dental[i].rut}</td>
                <td>${dental[i].prevision}</td>
            </tr>`;
}

//Obtener el id para saber que tabla llenar
document.getElementById("tabla-radiologia").innerHTML = texto1;
document.getElementById("tabla-traumatologia").innerHTML = texto2;
document.getElementById("tabla-dental").innerHTML = texto3;