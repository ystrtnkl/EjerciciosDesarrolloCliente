"use strict";
import { agregarEventoDespliegue } from "./bibliotecas/ejercicio1.js";

//Se usa un querySelector para recoger los elementos pares de igual manera que se hace en CSS.
//No se usó el getElementsByClassName ya que el enunciado pide agregar el evento a los elementos impares, independientemente de su clase.
//Se usa el método forEach ya que querySelectorAll devuelve un NodeList, el cual no tiene el método map.
document.querySelectorAll("main div:nth-child(odd)").forEach(e => {
    agregarEventoDespliegue(e);
});
