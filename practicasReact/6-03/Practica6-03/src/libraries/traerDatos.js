const urlsSwapi = ["https://swapi.info/api/", "https://swapi.dev/api/", "https://swapi.py4e.com/api/"];

const traerDatos = (endpoint, multiple) => {
    return Promise.race(urlsSwapi.map((url) => {
        return fetch(url + endpoint).then((respuesta) => {
            return respuesta.json();
        }).then((respuesta) => {
            return respuesta.results ? respuesta.results : respuesta;
        }).then((respuesta) => {
            if (multiple) {
                return respuesta.map((e, i) => {return {...e, id:i}});
            } else {
                return respuesta;
            }
        }).catch((error) => {
            return {fallo: true, error:error};
        });
    })).catch((error) => {
        return {fallo: true, error:error};
    });
}

const traerMultiplesDatos = (endpoints) => {
    return Promise.all()
    .catch((error) => {
        return {fallo: true, error:error};
    });
}

export { urlsSwapi, traerDatos, traerMultiplesDatos }