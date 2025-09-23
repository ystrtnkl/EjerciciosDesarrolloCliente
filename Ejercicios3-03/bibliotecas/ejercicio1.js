"use strict"
//En este archivo se encuentra el código del ejercicio 1, 2 y 4
import { validarDiscente } from "./ejercicio3.js";

//Se usa function ya que es necesario el uso de this.
const curso = {
    nombre: "Ejemplo",
    agno: 2025,
    descripcion: "",
    alumnado: [], //Aquí irían objetos discente
    imprimirCurso: function () { //Función que devuelve en formato texto los datos del curso
        let resultado = "Información del curso:\n";
        for (let e in { ...this }) {
            if (curso.hasOwnProperty(e) && typeof this[e] !== "function") { //No imprime funciones para no ensuciar la salida
                resultado += `${e} = "${this[e]}"\n`;
            }
        }
        return resultado;
    },
    matricular: function (discente) { //Función para agregar un nuevo alumno a partir del objeto discente
        let { id, nombre, apellidos, aficiones, notas } = discente;
        if (!validarDiscente(id, nombre, apellidos, aficiones, notas)) {
            console.log("No se ha podido añadir un nuevo alumno.");
            return;
        }
        this.alumnado = [...this.alumnado, discente];
    },
    construirCurso: function (nombre, agno, descripcion) { //Función que devuelve un curso nuevo en base a unos parámetros (excepto el alumnado, ya que se añaden después con la función matricular)
        if (!validarCurso({ nombre, agno, descripcion, alumnado: [] })) {
            console.log("Los datos del curso no son correctos.");
            return undefined;
        }
        let nuevo = { ...this };
        nuevo.nombre = nombre;
        nuevo.agno = agno;
        nuevo.descripcion = descripcion;
        return nuevo ;
    }
}

//Función adicional que valida los datos obligatorios del curso, esta función será útil en otros ejercicios.
//Se exige que nombre sea un string no vacío, agno un número entero distinto de 0, descripción un string y alumnado un array, que en caso de tener elementos sean todos strings no vacíos.
//Si los datos son válidos devuelve true, y si no, false.
const validarCurso = (curso) => {
    let { nombre, agno, descripcion, alumnado } = curso;

    if (typeof nombre !== "string" || nombre.length === 0) {
        console.log("Ha habido un error en el nombre.")
        return false;
    }

    if (typeof agno !== "number" || !Number.isInteger(agno) || agno === 0) {
        console.log("Ha habido un error en el año.")
        return false;
    }

    if (typeof descripcion !== "string") {
        console.log("Ha habido un error en la descripción.")
        return false;
    }

    if (!Array.isArray(alumnado)) {
        console.log("Ha habido un error en el alumnado.");
        return false;
    }

    let alumnadoCorrecto = true;
    if (alumnado.length > 0) {
        alumnado.map((e, i) => {
            if (typeof e !== "string" || e.length === 0) {
                alumnadoCorrecto = false;
                console.log(`Ha habido un error en el alumnado, concretamente con el alumno "${e}" en la posición ${i}.`);
            }
            return e;
        });
    }
    if (!alumnadoCorrecto) {
        return false;
    }

    return true;
}

export { curso, validarCurso };