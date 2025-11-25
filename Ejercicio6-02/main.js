"use strict";

import { getPeliculas, urlApiPeliculas } from "./bibliotecas/origenDatos.js";
import { htmlDatosPelicula, htmlLiPelicula } from "./bibliotecas/plantillaPelicula.js";

window.onload = () => {
    const listaPeliculas = document.getElementById("peliculas");


    getPeliculas(urlApiPeliculas)
        .then((peliculas) => {
            let contenidoLista = "";
            peliculas.map((e) => {
                contenidoLista += htmlLiPelicula(e);
            });
            listaPeliculas.innerHTML = contenidoLista;
        })
        .catch((error) => {
            listaPeliculas.innerHTML += "<li class='error'>Ha habido un error consultando la API</li>";
        });

    const informacionPelicula = document.getElementById("informacion");
    listaPeliculas.addEventListener("click", (e) => {
        if (e.target.classList.contains("pelicula")) {
            getPeliculas(urlApiPeliculas + "/" + e.target.id)
                .then((pelicula) => {
                    informacionPelicula.innerHTML = htmlDatosPelicula(pelicula);
                })
                .catch((error) => {
                    listaPeliculas.innerHTML += "<li class='error'>Ha habido un error consultando la API</li>";
                });
        }
    });
}