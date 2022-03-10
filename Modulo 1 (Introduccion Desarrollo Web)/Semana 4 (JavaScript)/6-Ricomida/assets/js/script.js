$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//Genera una alerta al hacer click en el boton enviar por correo
$(document).ready(function(){
    $("#enviarCorreo").click(function(){
      alert("Correo enviado");
    });
});

//Hacer 2 click cambia de color el texto ingredientes
$(document).ready(function(){
    
    $("#changeColor").on("dblclick", function(){
      // var color = $(this).css("color");
      var color = document.getElementById("changeColor").style.color
      if ( color == 'red'){
          $(this).css({
            "color": "#343a40"
          });
        }
         else {
          $(this).css({
            "color": "red"
          });
         }
    });
});

//Hacer 2 click cambia de color el texto preparación
$(document).ready(function(){
    $("#changeColor2").on("dblclick", function(){
        $(this).css({
      "color": "red"
      });
    });
});

//Cuando hace click aparece/desaparece el texto
$(document).ready(function(){
    $("#hideInfoPanqueque").click(function(){
      $("#hide").toggle("slow");
      $("#hide1").toggle();
      $("#hide2").toggle();
    });
});

$(document).ready(function(){
    $("#hideInfoTiramisu").click(function(){
      $("#hide").toggle();
      $("#hide1").toggle();
      $("#hide2").toggle();
    });
});

$(document).ready(function(){
    $("#hideInfoPlateada").click(function(){
      $("#hide").toggle();
      $("#hide1").toggle();
      $("#hide2").toggle();
    });
});