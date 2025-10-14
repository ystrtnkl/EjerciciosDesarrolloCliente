"use strict";
import { esPrimo } from "./bibliotecas/ejercicio2.js";

//Código para el ejercicio 2:
//La tabla se crea desde 0 completamente con JavaScript en lugar de usar una ya existente en el HTML.
const tabla = document.getElementById("contenedor-tabla").appendChild(document.createElement("table"));
tabla.setAttribute("id", "tabla-principal");
for (let i = 0; i < 10; i++) {
    const fila = tabla.appendChild(document.createElement("tr"));
    for (let ii = 1; ii < 11; ii++) {
        let valor = ii + (i * 10);
        fila.innerHTML += `<td>${valor}</td>`;
    }
}

setTimeout(() => {
    const tabla = document.getElementById("tabla-principal");
    const filas = Array.from(tabla.children); //Convirtiendo el HTMLCollection en Array para un mejor manejo.
    filas.map((e, i) => {
        const celdas = Array.from(e.children);
        celdas.map((ee, ii) => {
            if (esPrimo(parseInt(ee.innerHTML))) {
                ee.classList.add("celda-prima");
            }
        });
    });
}, 2000);
