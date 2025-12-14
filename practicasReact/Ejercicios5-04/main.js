"use strict";
import { barajar } from "./bibliotecas/ejercicio1.js";

window.onload = () => {
    //Referencia usada multiples veces a lo largo de la aplicación.
    const piezasInicio = document.getElementById("inicio");
    const textoGanar = document.getElementById("ganar");
    const juego = document.getElementById("juego");

    //Función para saber si los bloques están bien colocados.
    const comprobarResultado = () => {
        //Se usa querySelector ya que se necesita recoger solo las piezas (elementos con clase .bloque) que estén en el tablero (dentro del div con el id #tablero).
        const piezasPuestas = document.querySelectorAll("#tablero .bloque");
        textoGanar.classList.add("oculto"); //Se oculta siempre el texto de victoria, ya que se agregará solo cuando el puzzle esté resuelto.
        juego.classList.remove("resuelto");
        if (piezasPuestas.length === 9) {
            for (let i = 0; i <= piezasPuestas.length; i++) {
                //Si tan solo uno de los bloques no está en el orden que toca, sale del bucle y no sigue comprobando.
                if (piezasPuestas[i].id !== `bloque-${i + 1}`) {
                    break;
                }
                //Si se ha llegado hasta la última iteración y se ha comprobado que el bloque también está en orden, es que el puzzle está resuelto.
                if (i === piezasPuestas.length - 1) {
                    textoGanar.classList.remove("oculto");
                    juego.classList.add("resuelto");
                }
            }
        }
    }

    //Función para resetear el juego, poniendo todos los bloques de manera aleatoria.
    const inicializar = () => {
        const piezas = Array.from(piezasInicio.children);
        piezasInicio.innerHTML = "";
        barajar(piezas).forEach(e => {
            piezasInicio.appendChild(e);
        });
        textoGanar.classList.add("oculto"); //También se oculta el texto de victoria (debería desaparecer si se reinicia el juego).
        juego.classList.remove("resuelto");
    }
    inicializar(); //Los bloques se barajan una vez al cargar la página.
    //Como las imágenes tardan en cargar, el jugador podría verlas antes de que se barajen, así que empiezan como ocultas y se enseñan una vez barajado.
    piezasInicio.classList.remove("oculto");

    //Agregando la funcionalidad para el botón reiniciar.
    document.getElementById("boton-reiniciar").addEventListener("click", () => {
        //Primero devuelve todos los bloques al inicio.
        Array.from(document.getElementsByClassName("bloque")).forEach(e => {
            piezasInicio.appendChild(e);
        });
        inicializar(); //Y luego los baraja.
    });

    //Agregar el dragstart a la zona de arrastrables para guardar el id del objeto arrastrado en el evento.
    juego.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("id", e.target.id);
    }, false);

    //Previniendo los posibles comportamientos de dragover.
    juego.addEventListener("dragover", (e) => {e.preventDefault();}, false);

    //Agregando el evento para cuando se suelte el elemento arrastrado.
    juego.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("dejable")) {
            //Si se ha arrastrado un objeto arrastrable a un sitio donde se puede dejar, lo mueve a ese sitio.
            e.target.appendChild(document.getElementById(e.dataTransfer.getData("id")));
        }
        //Cada vez que se deja un bloque hay que comprobar si el puzzle está resuelto.
        comprobarResultado();
    }, false);


}