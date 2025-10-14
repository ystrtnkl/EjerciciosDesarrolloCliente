"use strict";

//Función sencilla que reemplaza textos, útil para censurar.
const censurar = (textoOriginal, palabra, reemplazo) => {
    let censurado = textoOriginal.replaceAll(palabra, reemplazo);
    return censurado;
}

export { censurar };