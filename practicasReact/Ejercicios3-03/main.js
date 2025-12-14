"use strict";
import { curso } from "./bibliotecas/ejercicio1.js"; //Incluye el código de los ejercicios 1, 2 y 4
import { discente } from "./bibliotecas/ejercicio3.js";
import { mostrarObjeto } from "./bibliotecas/ejercicio5.js";

//Código para el ejercicio 1:
const curso1 = curso.construirCurso("Ciencias", 2025, "Curso normal", ["Juan", "Ana", "Luis"]); //Bien
const curso2 = curso.construirCurso("Matemáticas", 2024, "Curso normal sin alumnos", []); //Bien
const curso3 = curso.construirCurso("Ciencias", 2025, "Curso normal"); //Undefined
const curso4 = curso.construirCurso("", 2025, "Curso normal", ["Juan", "Ana", "Luis"]); //Undefined
const curso5 = curso.construirCurso("Ciencias", "2025", "Curso normal", ["Juan", "Ana", "Luis"]); //Undefined
const curso6 = curso.construirCurso("Ciencias", 2025, 1234, ["Juan", "Ana", "Luis"]); //Undefined
const curso7 = curso.construirCurso("Ciencias", 2025, "Curso normal", "Juan, Ana, Luis"); //Undefined
const curso8 = curso.construirCurso("Ciencias", 2025, "Curso normal", ["Juan", "", "Luis"]); //Undefined
const curso9 = curso.construirCurso("Ciencias", 2025, "Curso normal", ["Juan", 1234, "Luis"]); //Undefined
const curso10 = curso.construirCurso("Ciencias", 2025, "Curso normal"); //Undefined

//Código para el ejercicio 2 (No se pidió que se mostrasen los datos por consola, así que los console.log están comentados):
//console.log(curso1.imprimirCurso());
curso2.nivelEstudios = 2; //Añadiendo una propiedad extra
//console.log(curso2.imprimirCurso());
//console.log(curso3.imprimirCurso()); //Error

//Código para el ejercicio 3 (No se pidió que se mostrasen los datos por consola, así que los console.log están comentados):
let alumno1 = discente.construirDiscente(1, "Alumno", "De Prueba", ["Afición normal", "Afición extraña"], { primera: 4, segunda: 9.6, tercera: 2.8 });
//console.log(alumno1.calcularMedia());
//alumno1.imprimirAficiones();
//alumno1.imprimirInforme();

//Código para el ejercicio 4 (se modificó bastante el código del ejercicio 1 para que sea un objeto completo y no un simple constructor):
curso1.matricular(alumno1);

//Código para el ejercicio 5 (No se pidió que se mostrasen los datos por consola, así que los console.log están comentados):
//console.log(mostrarObjeto(curso1, true));
//console.log(mostrarObjeto(curso1, false));
//console.log(mostrarObjeto("hola", true));
//console.log(mostrarObjeto(32, true));
//console.log(mostrarObjeto(false, true));
//console.log(mostrarObjeto(null, true));
//console.log(mostrarObjeto(undefined, true));



