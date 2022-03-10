//Agregando la función smooth scroll
$(document).ready(function()
{
    //agregando popover
    $('[data-toggle="popover"]').popover();

    //Iniciamos los tooltips
    $('[data-toggle="tooltip"]').tooltip()

    $("a").click(function(event)
    {
        //If para asegurar que exista un valor antes de hacer algo
        if (this.hash != "")
        {

            //Cancela lo que hace el click de forma predeterminada
            event.preventDefault();

            //guardamos el valor
            var loc = this.hash;

            //Animate = anima el scroll y lo suaviza
            //1600ms = tiempo para llegar al área
            $('html, body').animate(
            {
                scrollTop: $(loc).offset().top
            },1600, function()
            {
                //Agrega el hash (#) a la URL cuando termina de desplazarse (comportamiento del click por defecto)
                window.location.hash = loc;
            });
        }
    });

    //Oculta o muestra
    $(".hideTitle").click(function(){
        $(".hideText").toggle("slow");
    });

    //Type script
    function form_contact() { 
        var qs,js,q,s,d=document, 
        gi=d.getElementById, 
        ce=d.createElement, 
        gt=d.getElementsByTagName, 
        id="typef_orm", 
        b="https://embed.typeform.com/"; 
        if(!gi.call(d,id)) { 
            js=ce.call(d,"script"); 
            js.id=id; js.src=b+"embed.js"; 
            q=gt.call(d,"script")[0]; 
            q.parentNode.insertBefore(js,q) 
        } 
    }
    form_contact();
});