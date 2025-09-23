"use strict";
import { construirCurso } from "./bibliotecas/ejercicio1.js";
import { imprimirCurso } from "./bibliotecas/ejercicio2.js";
import { discente } from "./bibliotecas/ejercicio3.js"

//Código para el ejercicio 1:
const curso1 = construirCurso("Ciencias", 2025, "Curso normal", ["Juan", "Ana", "Luis"]); //Bien
const curso2 = construirCurso("Matemáticas", 2024, "Curso normal sin alumnos", []); //Bien
const curso3 = construirCurso("Ciencias", 2025, "Curso normal"); //Undefined
const curso4 = construirCurso("", 2025, "Curso normal", ["Juan", "Ana", "Luis"]); //Undefined
const curso5 = construirCurso("Ciencias", "2025", "Curso normal", ["Juan", "Ana", "Luis"]); //Undefined
const curso6 = construirCurso("Ciencias", 2025, 1234, ["Juan", "Ana", "Luis"]); //Undefined
const curso7 = construirCurso("Ciencias", 2025, "Curso normal", "Juan, Ana, Luis"); //Undefined
const curso8 = construirCurso("Ciencias", 2025, "Curso normal", ["Juan", "", "Luis"]); //Undefined
const curso9 = construirCurso("Ciencias", 2025, "Curso normal", ["Juan", 1234, "Luis"]); //Undefined
const curso10 = construirCurso("Ciencias", 2025, "Curso normal"); //Undefined

//Código para el ejercicio 2 (No se pidió que se mostrasen los datos por consola, así que los console.log están comentados):
//console.log(imprimirCurso(curso1));
//curso2.nivelEstudios = 2;
//console.log(imprimirCurso(curso2));
//console.log(imprimirCurso(curso3));

//Código para el ejercicio 3 (No se pidió que se mostrasen los datos por consola, así que los console.log están comentados):
//console.log(discente.calcularMedia());
//discente.imprimirAficiones();
//discente.imprimirInforme();

//Código para el ejercicio 4:





