"use strict";
import { calcularIMC } from "./ejercicio1.js";
import { calcularMediaEquipos, mejorEquipo } from "./ejercicio2.js";
import { iterarIncremental } from "./ejercicio3.js";
import { calcularImpuestos } from "./ejercicio4.js";


//Código para el ejercicio 1
let masaMarcos = 80;
let alturaMarcos = 1.80;
let masaJuan = 75;
let alturaJuan = 1.75;
let marcosIMCMayorJuanIMC = calcularIMC(masaMarcos, alturaMarcos) > calcularIMC(masaJuan, alturaJuan);

console.log(`¿Tiene Marcos un IMC mayor que el de Juan?: ${marcosIMCMayorJuanIMC}`);


//Código para el ejercicio 2
let equipoJuan = [89, 120, 103];
let equipoMiguel = [116, 94, 123];
let equipoMaria = [97, 134, 105];

let mediasEquipos = calcularMediaEquipos(equipoJuan, equipoMiguel, equipoMaria);
let equipoConMejorPuntuacion = mejorEquipo(["Juan", "Miguel", "Maria"], mediasEquipos);
//No se especifica mostrar la salida por consola, pero equipoConMejorPuntuacion tendría el nombre del mejor equipo


//Código para el ejercicio 3
iterarIncremental(4, 6);


//Código para el ejercicio 4
calcularImpuestos("Limonada", 3.5, 21);
