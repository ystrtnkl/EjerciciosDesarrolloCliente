"use strict";
import { colorAleatorio } from "./bibliotecas/ejercicio3.js";

//Código para el ejercicio 3:
setTimeout(() => {
    const parrafos = Array.from(document.getElementsByClassName("parrafo")); //Convirtiendo el HTMLCollection en Array para un mejor manejo.
    setInterval(() => {
        let parrafoCambiar = Math.floor(Math.random() * parrafos.length);
        parrafos.map((e, i) => {
            if (i === parrafoCambiar) {
                e.setAttribute("style", `background-color: ${colorAleatorio()};`); //Usando la propiedad style porque así se pide en la práctica.
            } else {
                e.removeAttribute("style");
            }
        });


    }, 1000);
}, 2000);
