const urlsSwapi = ["https://swapi.info/api/", "https://swapi.dev/api/", "https://swapi.py4e.com/api/"];
//Anteriormente estas funciones usaban .then(), ahora solo usan async/await.

//Hace una llamada a la API, concretamente la que responda antes, y devuelve los datos formateados.
const traerDatos = async (endpoint, multiple) => { //"endpoint" es el endpoint a partir de la url de la API, y si "multiple" es true aplicará un formateo en caso de devolver un array de objetos.
    try {
        return await Promise.any(urlsSwapi.map(async (url) => { //Se usa la API que responda exitosamente más rápido.
            try {
                let respuesta = await fetch(url + endpoint);
                respuesta = await respuesta.json();
                respuesta = respuesta.results ? respuesta.results : respuesta; //Se usa el objeto en .results en caso de existir.
                if (multiple) { //Si multiple es true, aplica un id auxiliar a cada uno de los items.
                    return respuesta.map((e, i) => { return { ...e, id: i } });
                }
                return respuesta;
            } catch (error) {
                throw new Error({ fallo: true, error: error });
            }
        }));
    } catch (error) {
        throw new Error({ fallo: true, error: error }); //En caso de error, devuelve una exception con fallo en true y con los datos del error.
    }
}

//Recibe un array de endpoints y los resuelve todos con fetch. Devuelve una promesa agrupando todos ellos (todos tienen que acabar sin errores).
const traerMultiplesDatos = async (endpoints) => {
    if (!Array.isArray(endpoints) && endpoints.length > 0) {
        return { fallo: true, error: "No se proporcionó un array de endpoints" };
    }
    try {
        return Promise.all(endpoints.map(async (endpoint) => {
            try {
                let respuesta = await fetch(endpoint);
                respuesta = await respuesta.json();
                respuesta = respuesta.results ? respuesta.results : respuesta;
                return respuesta;
            } catch (error) {
                throw new Error({ fallo: true, error: error });
            }
        }));
    } catch (error) {
        throw new Error({ fallo: true, error: error });
    }
}

export { urlsSwapi, traerDatos, traerMultiplesDatos }