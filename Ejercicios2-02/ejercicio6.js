"use strict";

//La función esNumero del ejercicio 2 será útil en este ejercicio
import { esNumero } from "./ejercicio2.js";

const operacion = (a, operacion, b) => {
    //Comprobar que ambos operandos sean números positivos enteros
    if (!esNumero(a) || !esNumero(b) || a < 0 || b < 0 || !Number.isInteger(a) || !Number.isInteger(b)) {
        return "ERROR: Se requieren dos números positivos enteros";
    }

    //Realizar la operación correspondiente (comprobando que no haya dividendo 0)
    switch (operacion) {
        case "+":
            return `${a} ${operacion} ${b} = ${a + b}`;
        case "-":
            return `${a} ${operacion} ${b} = ${a - b}`;
        case "/":
            if (b === 0) {
                return "ERROR: No se puede dividir entre 0";
            }
            return `${a} ${operacion} ${b} = ${a / b}`;
        case "*":
            return `${a} ${operacion} ${b} = ${a * b}`;
        case "%":
            if (b === 0) {
                return "ERROR: No se puede dividir entre 0";
            }
            return `${a} ${operacion} ${b} = ${a % b}`;
    }

    //En caso de que la operación no esté soportada por el switch
    return `ERROR: La operación "${operacion}" no es válida`;
}

export { operacion };