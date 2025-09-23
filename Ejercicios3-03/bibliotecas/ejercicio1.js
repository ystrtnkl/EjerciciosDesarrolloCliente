"use strict"

const construirCurso = (nombre, agno, descripcion, alumnado) => {
    if (validarCurso({nombre, agno, descripcion, alumnado})) {
        return { nombre, agno, descripcion, alumnado }
    }
    return undefined;
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

export { construirCurso, validarCurso };