"use strict";
import { censurar } from "./bibliotecas/ejercicio1.js";

//Código para el ejercicio 1:
setTimeout(() => {
    //No se tienen en cuenta las coincidencias en atributos u etiquetas especiales como <script> o <style> o enlaces ya que se prioriza el rendimiento.
    document.body.innerHTML = censurar(document.body.innerHTML, "sexo", "<span class='censurado'>Contenido Censurado</span>");
}, 2000);
