"use strict"

//Función que devuelve un código hexadecimal aleatorio de 6 cifras con un # a la izquierda (siguiendo el estándar para colores en CSS).
const colorAleatorio = () => {
    let resultado = "#";
    const letras = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
        resultado += letras[Math.floor(Math.random() * 16)];
    }
    return resultado;
}

export { colorAleatorio };