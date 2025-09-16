"use strict";
//Se trabajan los equipos en arrays pensando que pueden haber mas de 2 o 3 equipos

//Se especifica que la función calcule la media de los equipos, así que recibe como parámetros un número indefinido de arrays (que guarden la puntuación de los partidos)
//Por lo tanto devuelve un array con la media de cada equipo en el orden en el que se introdujeron sus arrays.
function calcularMediaEquipos() {
    let medias = [];
    for (let i = 0; i < arguments.length; i++) {
        //Solo admite arrays no vacíos
        if (Array.isArray(arguments[i]) && arguments[i].length > 0) {
            medias.push(calcularMediaEquipo(arguments[i]));
        } else {
            return undefined;
        }
    }
    return medias;
}
//Esta función solo calcula la media de un equipo, es necesaria para calcularMediaEquipos()
const calcularMediaEquipo = (equipo) => {
    let suma = 0;
    equipo.forEach(e => {
        suma += e;
    });
    return suma / equipo.length;
}

//Calcula el equipo con la mejor puntuación, recibe dos arrays, uno con los nombres de los equipos y otro con su respectiva puntuación
//Devuelve el nombre del equipo con mejor puntuación
const mejorEquipo = (nombres, puntuaciones) => {
    //Requiere que ambos arrays midan lo mismo y no estén vacíos
    if (Array.isArray(nombres) && Array.isArray(puntuaciones) && nombres.length == puntuaciones.length && nombres.length > 0) {
        let mejorPuntuacion = 0;
        let mejorEquipo = "";
        for (let i = 0; i < puntuaciones.length; i++) {
            if (puntuaciones[i] > mejorPuntuacion) {
                mejorPuntuacion = puntuaciones[i];
                mejorEquipo = nombres[i];
            }
        }
        return mejorEquipo;
    } else {
        return undefined;
    }
}

export { calcularMediaEquipos, mejorEquipo };