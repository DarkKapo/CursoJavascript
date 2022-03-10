$(function(){
    $('#enviar').on('click',function(e){
        e.preventDefault();
        //Probando método remove (https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)
        $(".resultado").remove();

        // Obtener valor
        let id = document.getElementById('inputHero').value
       
        //If para verificar rango
        if (id>0 && id<733){
            $.ajax({
                type: "GET",
                url: `https://www.superheroapi.com/api.php/2973630296293444/${id}`,
                dataType: "json",
                success: function(datosApi){
                    //Agregar HTML manualmente (Se usa una carta para el Heroe). Es un template copiado y adaptado para que me funcione
                    $(".busqueda").append(
                        `<section class="container mt-3 resultado">
                        <div class="row">
                            <div class="card bg-success justify-content-center">
                                <div class="card-body">
                                    <div class="column-6" >
                                    <div id="ApiResp" class="row">
                                    
                                    </div>
                                    <div class="row my-4">
                                        <div id="fotoHeore" class="col-6">
                        
                                        </div>
                                        <div class="col-6" id="infoSuper">
                                            <ul id="list" class="list-group list-group-flush"></ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div class="row">
                            <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                        </div>
                    </section>`
                    );
                    
                    //Llenando secciones

                    $('#ApiResp').append(`<h3 class="ml-3"> Héroe encontrado </h3>`);
                    $("#fotoHeore").append(`<img class="img-fluid" src="${datosApi.image.url}">`)
                    $('#list').append(`
                    <li class="list-group-item"> <h4>Nombre</h4> ${datosApi.name} </li>
                    <li class="list-group-item"><h4>Conexiones:</h4> ${datosApi.connections['group-affiliation']}, ${datosApi.connections.relatives} </li>
                    <li class="list-group-item"><h4>Publicado por</h4> ${datosApi.biography.publisher}</li>
                    <li class="list-group-item"><h4>Ocupación</h4> ${datosApi.work.occupation}</li>
                    <li class="list-group-item"><h4>Primera Aparición</h4> ${datosApi.biography['first-appearance']}</li>
                    <li class="list-group-item"><h4>Altura</h4> ${datosApi.appearance.height[0]} - ${datosApi.appearance.height[1]}</li>
                    <li class="list-group-item"><h4>Peso</h4> ${datosApi.appearance.weight[0]} - ${datosApi.appearance.weight[1]}</li>
                    <li class="list-group-item"><h4>Alias</h4> ${datosApi.biography.aliases}</li>
                    `)

                    //Guardar datos
                    var stat = [datosApi.powerstats.combat,datosApi.powerstats.durability,datosApi.powerstats.intelligence,datosApi.powerstats.power,datosApi.powerstats.speed,datosApi.powerstats.strength];

                    //Funcion para verificar si un elemento es distinto de null
                    const vNulo = (currentValue) => currentValue !== 'null';

                    //If para llenar el gráfico, antes verifica que todos los datos cumplan con no ser vacío (https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
                    if (stat.every(vNulo)){
                        var options = {
                            title: {
                                text: `Gráfico con los stats ${datosApi.name}`
                            },
                            //Activa la animación
                            animationEnabled: true,
                            data: [{
                                type: "pie",
                                startAngle: 40,
                                toolTipContent: "<b>{label}</b>: {y}%",
                                showInLegend: "true",
                                legendText: "{label}",
                                indexLabelFontSize: 16,
                                indexLabel: "{label} - {y}%",
                                dataPoints: [
                                    { y: stat[0], label: "Combat" },
                                    { y: stat[1], label: "Durability" },
                                    { y: stat[2], label: "Intelligence" },
                                    { y: stat[3], label: "Power" },
                                    { y: stat[4], label: "Speed" },
                                    { y: stat[5], label: "Strength" }
                                ]
                            }]
                        };
                        
                        $("#chartContainer").CanvasJSChart(options); 
                    }
                    else{$("#chartContainer").append(`<h4 class="ml-3 text-danger"> No se puede crear el gráfico </h4>`)}
                },
                error: function(){
                    alert("Obtuvimos un error")
                    $('#ApiResp').append(`<h2 class="text-danger"> SuperHero No encontrado </h2>`);
                }
            })     
        }
        else{
            alert('Ingrese valor entre desde 1 hasta 732')
        }  
    })
})