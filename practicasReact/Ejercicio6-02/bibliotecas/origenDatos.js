const urlApi = "https://swapi.info/api"; //Enlace de la API entera.
const urlApiPeliculas = "https://swapi.info/api/films"; //Enlace del endpoint para las películas.

//Función que devuelve una promesa que pide el array de películas y lo formatea debidamente.
const getPeliculas = (url) => {
    return fetch(url)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((datos) => {
            return datos.map((e, i) => {return {...e, id:i}});
        })
        .catch((error) => {return error});
}

//Función en caso de querer recibir solo una película (ejemplo: https://swapi.info/api/filmps/1).
const getPelicula = (url) => {
    return fetch(url)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((datos) => {
            return datos;
        })
        .catch((error) => {return error});
}

export { urlApi, urlApiPeliculas, getPeliculas, getPelicula }