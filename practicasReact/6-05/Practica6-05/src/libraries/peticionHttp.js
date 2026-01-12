
//Petición HTTP genérica, recibe método, body y url, devuelve la respuesta.
const peticionGenerica = async (url, metodo = "GET", body, headersExtra = []) => {
    try {
        //Si el método es get, el body no se pone. Ademas ya viene con el header Content-Type: application/json por defecto.
        const resultado = await fetch(url, {method: metodo, body: metodo === "GET" ? undefined : JSON.stringify(body), headers: {...(headersExtra ?? []), "Content-Type": "application/json"}});
        return await resultado.json();
    } catch (error) {
        throw new Error({ fallo: true, error: error });
    }
}

export { peticionGenerica }