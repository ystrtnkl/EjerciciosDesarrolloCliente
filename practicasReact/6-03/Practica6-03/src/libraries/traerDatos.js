const urlsSwapi = ["https://swapi.info/api/", "https://swapi.dev/api/", "https://swapi.py4e.com/api/"];

//Hace una llamada a la API, concretamente la que responda antes, y devuelve los datos formateados.
const traerDatos = (endpoint, multiple) => { //"endpoint" es el endpoint a partir de la url de la API, y si "multiple" es true aplicará un formateo en caso de devolver un array de objetos.
    return Promise.race(urlsSwapi.map((url) => {
        return fetch(url + endpoint).then((respuesta) => {
            return respuesta.json();
        }).then((respuesta) => {
            return respuesta.results ? respuesta.results : respuesta; //Se devuelve la respuesta directamente o lo que contenga results en caso de existir.
        }).then((respuesta) => {
            if (multiple) { //Si multiple es true, aplica un id auxiliar a cada uno de los items.
                return respuesta.map((e, i) => {return {...e, id:i}});
            } else {
                return respuesta;
            }
        }).catch((error) => {
            return {fallo: true, error:error}; //En caso de cualquier error, devuelve un objeto con "fallo" en true y con el error.
        });
    })).catch((error) => {
        return {fallo: true, error:error};
    });
}

//Recibe un array de endpoints y los resuelve todos con fetch. Devuelve una promesa agrupando todos ellos (todos tienen que acabar sin errores).
const traerMultiplesDatos = (endpoints) => {
    if (!Array.isArray(endpoints) && endpoints.length > 0) {
        return {fallo: true, error:"No se proporcionó un array de endpoints"};
    }
    return Promise.all(endpoints.map((endpoint) => { //Se busca que todas las promesas terminen sin errores.
        return fetch(endpoint)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((respuesta) => {
            return respuesta.results ? respuesta.results : respuesta; //Se devuelve la respuesta directamente o lo que contenga results en caso de existir.
        })
        .catch((error) => {
            return {fallo: true, error:error}; //En caso de cualquier error, devuelve un objeto con "fallo" en true y con el error.
        })
    }))
    .catch((error) => {
        return {fallo: true, error:error};
    });
}

export { urlsSwapi, traerDatos, traerMultiplesDatos }