"use strict";
import { validarDisco, validarLocalizacion } from "./validaciones.js";

//De momento los discos están guardados en localStorage bajo la clave "discos" en formato JSON, si se quisiera hacer que se guarden en un servidor habría que cambiar estas mismas funciones.
const permitidoLocalStorage = () => {
    return typeof Storage !== "undefined";
}

//Devuelve un array con todos los discos guardados.
const getTodosLosDiscos = () => {
    if (!permitidoLocalStorage()) {
        return [];
    }
    const guardados = localStorage.getItem("discos");
    if (guardados === null || guardados === undefined || guardados === "") {
        return []; //Si no hay nada guardado es que no hay discos.
    } else {
        //Se transforma de texto a json y se devuelven solo los discos válidos.
        return JSON.parse(guardados).filter((e) => {return validarDisco(e)});
    }
}

//Devuelve el disco que coincida con la localización si existe.
const getDisco = (localizacion) => {
    if (permitidoLocalStorage() && validarLocalizacion(localizacion)) {
        let discos = getTodosLosDiscos(); //Se comprueban todos los discos, esto en una base de datos real se haría de manera más óptima.
        discos = discos.filter((e) => {return e.localizacion === localizacion});
        return discos[0] ?? null;
    }
    return null;
}

//Guarda tantos discos como se le pasen en el array (para guardar uno, pasar un array con un solo elemento).
const guardarDiscos = (discosNuevos) => {
    console.log(discosNuevos);
    //Comprueba que discos sea un array válido con discos válidos.
    if (permitidoLocalStorage() && Array.isArray(discosNuevos) && discosNuevos.length > 0 && discosNuevos.every((e) => {return validarDisco(e)})) {
        let discos = getTodosLosDiscos(); //Ver los discos que ya habían.
        discos = [...discos, ...discosNuevos]; //Agregar los discos nuevos.
        localStorage.setItem("discos", JSON.stringify(discos)); //Reemplazar los anteriores por el array de los anteriores más los nuevos.
    }
}

//Borra el disco que tenga el identificador (si no coincide ninguno no hace nada).
const borrarDisco = (identificador) => {
    if (permitidoLocalStorage() && validarLocalizacion(identificador)) {
        let discos = getTodosLosDiscos(); //Ver los discos que ya habían.
        discos = discos.filter((e) => {return e.localizacion !== identificador}); //Filtrar lo que no coinciden con el identificador.
        localStorage.setItem("discos", JSON.stringify(discos)); //Guardar todos los discos menos los que coincidían con el identificador.
    }
}

//Borra todos los discos del localStorage.
const borrarTodosLosDiscos = () => {
    if (permitidoLocalStorage()) {
        localStorage.removeItem("discos");
    }
}



export { getTodosLosDiscos, guardarDiscos, borrarTodosLosDiscos, borrarDisco, getDisco };