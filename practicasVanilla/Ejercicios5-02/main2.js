"use strict";

window.onload = () => {
    //Se requiere la misma cantidad de elementos en ambas clases.
    const pestagnas = document.getElementsByClassName("pestagna");
    const contenidos = document.getElementsByClassName("contenido");
    if (pestagnas.length === contenidos.length) {
        //Se agrega el evento al primer div del main, que es el que contiene las pestañas.
        document.getElementsByTagName("MAIN")[0].children[0].addEventListener("click", (e) => {
            if (e.target.tagName === "SPAN") {
                //Se debe saber que pestaña ha sido pulsada, en este caso se hace mediante indexOf.
                const indice = Array.prototype.slice.call(pestagnas).indexOf(e.target);
                //Se pone la clase oculto a todos y luego se quita al div de contenido con el mismo indice que la pestaña pulsada.
                for (let i = 0; i <= pestagnas.length - 1; i++) {
                    contenidos[i].classList.add("oculto");
                }
                contenidos[indice].classList.remove("oculto");
            }
        });
    }
}
