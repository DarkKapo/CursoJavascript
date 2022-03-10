const nombre = document.querySelector("#nombre")
const pagina = document.querySelector("#pagina")
const repoPagina = document.querySelector("#repoPagina")
const resultados = document.querySelector("#resultados")
const formulario = document.querySelector("form")

const urlBase = "https://api.github.com/users"

//Conseguir el usuario, esta función devuelve una promesa por el async
const getUser = async (nombre) => {
    const url = `${urlBase}/${nombre}`
    //realiza la consulta
    const respuesta = await fetch(url)
    //transformar a json
    const resultado = await respuesta.json()
    return resultado
}

const getRepo = async (nombre, pagina, repoPagina) => {
    const url = `${urlBase}/${nombre}/repos?page=${pagina}&per_page=${repoPagina}`
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    return resultado
}

formulario.addEventListener('submit', async (e)=> {
    e.preventDefault()
    //usamos await porque getUser es una promesa async
    const usuario = await getUser(nombre.value)
    const repositorios = await getRepo(nombre.value, pagina.value, repoPagina.value)
    //string donde están los repositorios
    let repos = ``
    repositorios.forEach(repo => {
        repos += `
        <p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
        `
    });
    resultados.innerHTML = `
            <div class="row mt-4">
            <div class="text-left col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <h3>Datos de Usuario</h3>
                <div class="w-50">
                    <img src="${usuario.avatar_url}" class="img-fluid">
                </div>
                <p> Nombre de usuario: ${usuario.name}</p>
                <p> Nombre de login: ${usuario.login}</p>
                <p> Cantidad de Repositorios: ${usuario.public_repos}</p>
                <p> Localidad: ${usuario.location}</p>
                <p> Tipo de usuario: ${usuario.type}</p>
            </div>
            <div class="text-right col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <h3>Nombre de repositorios</h3>
                ${repos}
            </div>
        </div>
`
})