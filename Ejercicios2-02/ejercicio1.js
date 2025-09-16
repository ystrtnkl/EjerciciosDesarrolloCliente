"use strict";

//La función esNumero del ejercicio 2 será útil en este ejercicio
import { esNumero } from "./ejercicio2.js";

//Recibe el número del mes (1-12) y devuelve su nombre
const verMes = (numeroMes) => {
    if (!esNumero(numeroMes)) {
        return "ERROR: No es un número";
    }
    if (numeroMes < 1 || numeroMes > 12) {
        return "ERROR: Los meses van del 1 al 12";
    }
    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",];
    return meses[numeroMes - 1];
}

export { verMes };