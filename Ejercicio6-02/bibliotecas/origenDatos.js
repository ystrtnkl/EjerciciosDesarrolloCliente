const urlApi = "https://swapi.info/api";
const urlApiPeliculas = "https://swapi.info/api/films";

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