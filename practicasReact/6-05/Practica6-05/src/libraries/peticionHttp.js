
//Petición HTTP genérica, recibe método, body y url, devuelve la respuesta.
const peticionGenerica = async (url, metodo = "GET", body, headersExtra = []) => {
    try {
        const resultado = await fetch(url, {method: metodo, body: metodo === "GET" ? JSON.stringify(body) : '', headers: {...(headersExtra ?? []), "Content-Type": "application/json"}});
        return await resultado.json();
    } catch (error) {
        console.log(error);
        throw new Error({ fallo: true, error: error });
    }
}

export { peticionGenerica }