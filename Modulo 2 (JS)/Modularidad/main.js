import calculadora from './calculadora.js'

let calcular = document.getElementById('calcular')
let resultado = document.getElementById('resultado')

calcular.addEventListener('click', () => {
    let opera = document.getElementById('opera').value
    let a = document.getElementById('a').value
    let b = document.getElementById('b').value
    if(opera == 'sumar' || opera == 'restar' || opera == 'multiplicar' || opera == 'dividir' && a && b)
    {
        resultado.innerHTML = calculadora[opera](parseInt(a),parseInt(b))
    }else{
        alert("Ingrese una operación (sumar, restar, multiplicar, dividir) y un valor en ambas casillas")
    }
})