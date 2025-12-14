"use strict";
import { verMes } from "./ejercicio1.js";
import { comprobacionesNumero } from "./ejercicio2.js";
import { multiplosDeTres } from "./ejercicio3.js";
import { potencia } from "./ejercicio4.js";
import { media } from "./ejercicio5.js";
import { operacion } from "./ejercicio6.js";

//Código para el ejercicio 1:
console.log(verMes(4));
console.log(verMes(7));
console.log(verMes(0));
console.log(verMes(13));
console.log(verMes("hola"));
console.log(verMes(true));
console.log(verMes(false));
console.log(verMes(undefined));
console.log(verMes(null));
console.log(verMes());


//Código para el ejercicio 2:
console.log(comprobacionesNumero(7));
console.log(comprobacionesNumero(8));
console.log(comprobacionesNumero(0));
console.log(comprobacionesNumero(1));
console.log(comprobacionesNumero(2));
console.log(comprobacionesNumero(3));
console.log(comprobacionesNumero(-8));
console.log(comprobacionesNumero(-7));
console.log(comprobacionesNumero(5.2));
console.log(comprobacionesNumero());
console.log(comprobacionesNumero("hola"));
console.log(comprobacionesNumero(true));
console.log(comprobacionesNumero(false));
console.log(comprobacionesNumero("33"));
console.log(comprobacionesNumero(null));
console.log(comprobacionesNumero(undefined));


//Código para el ejercicio 3:
console.log(multiplosDeTres(10));
console.log(multiplosDeTres(1));
console.log(multiplosDeTres(2));
console.log(multiplosDeTres(3));
console.log(multiplosDeTres(4));
console.log(multiplosDeTres(-5));
console.log(multiplosDeTres(0));
console.log(multiplosDeTres(4.3));
console.log(multiplosDeTres(100));
console.log(multiplosDeTres("hola"));
console.log(multiplosDeTres("30"));
console.log(multiplosDeTres(true));
console.log(multiplosDeTres(false));
console.log(multiplosDeTres(undefined));
console.log(multiplosDeTres(null));
console.log(multiplosDeTres());


//Código para el ejercicio 4:
console.log(potencia(3, 4));
console.log(potencia(0, 3));
console.log(potencia(3, 0));
console.log(potencia(0, 0));
console.log(potencia(2.4, 3));
console.log(potencia(3, -5));
console.log(potencia(-3, 5));
console.log(potencia(null, undefined));
console.log(potencia(false, true));
console.log(potencia("hola"));


//Código para el ejercicio 5:
console.log(media(3, 4, 5, 6, 7));
console.log(media(3));
console.log(media());
console.log(media(false, true, null, undefined, "hola"));


//Código para el ejercicio 6:
console.log(operacion(3, '+', 4));
console.log(operacion(3, '-', 4));
console.log(operacion(3, '*', 4));
console.log(operacion(3, '/', 4));
console.log(operacion(3, '%', 4));
console.log(operacion(3, '/', 0));
console.log(operacion(3, '%', 0));
console.log(operacion(3, 'v', 4));
console.log(operacion(true, '+', false));
console.log(operacion(undefined, '+', null));
console.log(operacion(0.6, '+', 4));
console.log(operacion("hola", '+'));
