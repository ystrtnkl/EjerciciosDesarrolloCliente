"use strict"

//Función sencilla que devuelve true si el número pasado por parámetros es primo, se considera 2 como primo.
const esPrimo = (num) => {
    if (isNaN(num) || !Number.isInteger(num) || num < 2) {
        return false;
    }
    if (num === 2) {
        return true;
    }
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

export { esPrimo };