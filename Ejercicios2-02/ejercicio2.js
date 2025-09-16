"use strict";

const comprobacionesNumero = (numero) => {
    //EsNumero, EsPar, EsPositivo, EsPrimo
    let resultado = [false, false, false, false];
    //Comprobar si es un número mediante la función de abajo
    if (!esNumero(numero)) {
        return analisisNumerico(resultado, numero);
    }
    resultado[0] = true;

    //Comprobar si es par
    if (numero % 2 === 0) {
        resultado[1] = true;
    }

    //Comprobar si es positivo (se considera 0 como positivo)
    if (numero >= 0) {
        resultado[2] = true;
    }

    //Comprobar si es primo (se considera que los negativos, decimales, el 0 y el 1 no son primos)
    if (numero > 1 && Number.isInteger(numero)) {
        resultado[3] = true;
        for (let i = 2; i < numero; i++) {
            if (numero % i === 0) {
                resultado[3] = false;
            }
        }
    }
    
    //Devuelve el texto formateado mediante la función analisisNumerico
    return analisisNumerico(resultado, numero);
};

//Recibe tanto el array con los datos sobre el número y el dato en sí, y devuelve dichos datos formateados a texto
const analisisNumerico = (aclaraciones, numero) => {
    if (!aclaraciones[0]) {
        return `"${numero}" no es un número.`;
    }
    return `${numero} es un número, 
    es ${aclaraciones[1] ? "par" : "impar"}, 
    es ${aclaraciones[1] ? "negativo" : "positivo"} 
    y ${aclaraciones[3] ? "es primo" : "no es primo"}.`;
};

//Función aislada para comprobar si un dato es un número, devuelve true en ese caso
const esNumero = (dato) => {
    //isNaN devuelve false con los parámetros true, false y null, por eso se comprueban también
    return (!isNaN(dato) && dato !== true && dato !== null && dato !== false);
}

//También se exporta la función esNumero ya que será útil para otros ejercicios
export { comprobacionesNumero, esNumero };
