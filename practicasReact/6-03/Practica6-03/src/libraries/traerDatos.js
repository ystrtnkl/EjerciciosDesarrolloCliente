const urlsSwapi = ["https://swapi.info/api/", "https://swapi.dev/api/", "https://swapi.py4e.com/api/"];

const traerDatos = (endpoint) => {
    return Promise.race(urlsSwapi.map((url) => {
        return fetch(url + endpoint).then((respuesta) => {
            return respuesta.json();
        }).then((respuesta) => {
            return respuesta.results ? respuesta.results : respuesta;
        }).then((respuesta) => {
            return respuesta.map((e, i) => {return {...e, id:i}});
        }).catch((error) => {
            console.log(error);
            return error;
        });
    })).catch((error) => {
        console.log(error);
        return error;
    });
}

export { urlsSwapi, traerDatos }