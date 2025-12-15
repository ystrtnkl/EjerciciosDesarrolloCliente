"use strict";

//La función esNumero del ejercicio 2 será útil en este ejercicio
import { esNumero } from "./ejercicio2.js";

const potencia = (base, exponente) => {
    //Comprobar que los datos sean números válidos, por complicaciones técnicas la función solo admite exponentes enteros
    if (!esNumero(base) || !esNumero(exponente) || (exponente === 0 && base === 0)) {
        return "ERROR: Datos inválidos";
    }
    exponente = Math.floor(exponente);
    //Casos especiales
    if (base === 0) {
        return 0;
    }
    if (exponente === 0) {
        return 1;
    }

    let resultado = base;
    //El cálculo (el cual se pide que sea con el bucle while) no es el mismo con exponentes positivos que negativos
    let i = 1;
    while (i < Math.abs(exponente)) {
        resultado *= base;
        i++;
    }
    if (exponente < 0) {
        resultado = 1 / resultado;
    }

    return `${base} elevado a ${exponente} es ${resultado}`;
}

export { potencia };