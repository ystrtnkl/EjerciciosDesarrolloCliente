"use strict";
//import { x } from "./bibliotecas";

window.onload = () => {
    //Se agregan las celdas mediante Javascript para no tener un HTML de miles de líneas.
    let celdas = "";
    for (let i = 0; i <= 60; i++) {
        celdas += "<tr>";
        for (let ii = 0; ii <= 60; ii++) {
            celdas += "<td>";
        }
        celdas += "</tr>";
    }
    //Hacer esto agregará un elemento llamado tbody dentro de la tabla, el cual contendrá todas las celdas. Se hace incluso cuando no se pidió que se haga pero realmente no es un problema.
    document.getElementById("pixeles").innerHTML = celdas; 
}