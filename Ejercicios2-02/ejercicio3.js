"use strict";

//La función esNumero del ejercicio 2 será útil en este ejercicio
import { esNumero } from "./ejercicio2.js";

//Devuelve todos los múltiplos de 3 entre 1 y el número introducido
const multiplosDeTres = (numero) => {
    //Comprobar que el dato sea un número, positivo y entero
    if (!esNumero(numero) || !Number.isInteger(numero) || numero < 1) {
        return `ERROR: "${numero}" no es un dato válido`;
    }

    let resultado = "";
    for (let i = 1; i <= numero; i++) {
        if (i % 3 === 0) {
            resultado = `${resultado} ${i}`
        }
    }
    if (resultado === "") {
        resultado = " (no tiene múltiplos de 3)"
    }
    return `La secuencia para ${numero} es:${resultado}`;
}

export { multiplosDeTres };