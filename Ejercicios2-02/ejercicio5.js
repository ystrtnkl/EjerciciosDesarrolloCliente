"use strict";

//La función esNumero del ejercicio 2 será útil en este ejercicio
import { esNumero } from "./ejercicio2.js";

//Calcula la media de todos los números pasados como parámetro, necesita ser function ya que hace uso de arguments
function media() {
    //Comprueba que haya más de un número y que todos los números sean enteros y positivos
    if (arguments.length === 0) {
        return "ERROR: No se han introducido números";
    }
    for (let i = 0; i < arguments.length; i++) {
        if (!esNumero(arguments[i]) || !Number.isInteger(arguments[i]) || arguments[i] < 0) {
            return `ERROR: "${arguments[i]}" no es un número válido`;
        }
    }
    let suma = 0;
    for (let i = 0; i < arguments.length; i++) {
        suma += arguments[i];
    }
    return `La media de todos los números es ${suma / arguments.length}`;
}

export { media };