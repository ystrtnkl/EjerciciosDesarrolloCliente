"use strict";
import { validarCurso } from "./ejercicio1.js"; //Importando la función validarCurso del ejercicio 1, que será útil en este script.

//Devuelve en formato texto los datos de un curso, los obligatorios y cualquier otro que se le añada.
const imprimirCurso = (curso) => {
    if (curso === undefined || !validarCurso(curso)) {
        return "No se ha podido imprimir el objeto curso porque no es válido.";
    }
    let e; //La variable iteradora tiene que ser declarada antes ya que el script funciona en modo strict.
    let resultado = "Información del curso:\n";
    for (e in curso) {
        if (curso.hasOwnProperty(e)) {
            resultado += `"${e}" = "${curso[e]}"\n`;
        }
    }
    return resultado;
}

export { imprimirCurso };