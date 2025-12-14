"use strict";
import { identificarMinas, imprimirTablero, generarTableroAleatorio } from "./bibliotecas/ejercicio1.js";

//Código para el ejercicio 1:
/*const tablero = [[-1, 0, 0, 0],
[ 0, 0, 0, 0],
[ 0,-1, 0, 0],
[ 0, 0, 0, 0]];*/
const tablero = generarTableroAleatorio(); //Generando un tablero sin resolver.
console.log(imprimirTablero(identificarMinas(tablero))); //Imprimiendo el tablero resuelto.


