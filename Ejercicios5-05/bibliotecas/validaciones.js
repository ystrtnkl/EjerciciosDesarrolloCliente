"use strict";
//Distintas funciones que reciben un dato a usar en la aplicación y lo validan, devuelven false si no cumple los criterios y true o el propio dato si sí.

const regexAgno = /^\d{4}$/;
const regexLocalizacion = /^[A-Z]{2}-\d{3}[A-Z]{2}$/;

//Texto de al menos 5 caracteres.
const validarNombreDisco = (nombre) => {
    return typeof nombre === "string" && nombre.length >= 5
    ? nombre : false;
}

//Texto, de al menos 5 caracteres.
const validarInterpreteOGrupo = (nombre) => {
    //Se usa una función distinta que el nombre aunque los criterios sean los mismos por si llegasen a cambiar en el futuro.
    return validarNombreDisco(nombre);
}

//Cuatro caracteres numéricos (pero sigue siendo texto).
const validarAgno = (agno) => {
    return typeof agno === "string" 
        && regexAgno.test(agno)
        ? agno : false;
}

//Array de textos, mínimo un elemento y cada uno debe de ser un texto no vacío.
const validarGenero = (generos) => {
    return Array.isArray(generos) 
        && generos.length > 0 
        //Función every para comprobar si todos los elementos cumplen la condición.
        && generos.every((e) => {return typeof e === "string" && e.length > 0})
        ? generos : false;
}

//Un código que sea así: <dos mayúsculas>-<tres dígitos><dos mayúsculas>, por ejemplo ES-001AA o ZR-512TR.
const validarLocalizacion = (localizacion) => {
    return typeof localizacion === "string"
        && regexLocalizacion.test(localizacion)
        ? localizacion : false;
}

//Valida el objeto entero de disco, que tiene los campos anteriores (el año y si está prestado son opcionales, pero deben cumplir los criterios si están presentes en el objeto).
const validarDisco = (disco) => {
    //Los campos que se permite que sean undefinied son los no obligatorios.
    return typeof disco === "object"
        && validarNombreDisco(disco.nombre)
        && validarInterpreteOGrupo(disco.grupo)
        && (disco.agno === undefined || validarAgno(disco.agno) || disco.agno === '')
        && validarLocalizacion(disco.localizacion)
        && validarGenero(disco.genero)
        && typeof disco.prestado === "boolean" || typeof disco.prestado === "undefined"
        ? disco : false;
}

export { validarNombreDisco, validarInterpreteOGrupo, validarAgno, validarGenero, validarLocalizacion, validarDisco };