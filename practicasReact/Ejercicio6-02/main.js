"use strict";

import { getPeliculas, urlApiPeliculas } from "./bibliotecas/origenDatos.js";
import { htmlDatosPelicula, htmlLiPelicula } from "./bibliotecas/plantillaPelicula.js";

window.onload = () => {
    const listaPeliculas = document.getElementById("peliculas");
    let peliculasCache = []; //Para reducir el número de peticiones a la API, se guardan las películas. Esto es porque la API devuelve todos los datos de todas las películas de golpe.
    //Si la API solo mostrase los datos básicos de cada película a la hora de pedir todas las películas lo mejor sería ir guardando en esta caché cada película en la que se haga clic.

    //Función asíncrona para cargar las películas.
    const cargarPeliculasIniciales = async () => {
        try {
            const peliculas = await getPeliculas(urlApiPeliculas); //Hacer la petición (esto devuelve una promesa).
            peliculasCache = peliculas; //Una vez consultada a la API se guarda en caché las películas (dicha variable no se usará hasta que carguen todas las películas, así que se puede hacer la asignación aquí).
            dibujarListaPeliculas(peliculas); //Una vez consultada a la API, manda las peliculas a dibujar.
            return peliculas;
        } catch (error) {
            //En caso de que haya algún error en la petición
            listaPeliculas.innerHTML += "<li class='error'>Ha habido un error consultando la API</li>";
        }
    }

    //Por cada elemento en el array introducido, dibuja un "botón" para mostrar esa película (en la lista).
    const dibujarListaPeliculas = (peliculas) => {
        let contenidoLista = "";
        peliculas.map((e) => {
            contenidoLista += htmlLiPelicula(e);
        });
        listaPeliculas.innerHTML = contenidoLista;
    }

    cargarPeliculasIniciales(); //Se llama a cargar las películas una vez declaradas las funciones. Mientras tanto, se va ejecutando el código a continuación.


    const informacionPelicula = document.getElementById("informacion");
    //Se agrega un evento a la lista para mostrar los datos de X pelíucla cuando se le haga clic. Estos elementos solo serán visibles una vez los datos hayan cargado (cuando se pinte la lista).
    listaPeliculas.addEventListener("click", (e) => {
        if (e.target.classList.contains("pelicula")) {
            try {
                //const pelicula = await getPelicula(urlApiPeliculas + "/" + e.target.id); //Por si se quisiera hacer una petición cada vez que se solicita una película, este evento tendría que ser async.
                const pelicula = peliculasCache.filter((p) => {return e.target.id === p.episode_id.toString()})[0]; //Para cuando se haga clic en una película la caché ya tendrá objetos, así que se usa el que tenga el mismo id.
                informacionPelicula.innerHTML = htmlDatosPelicula(pelicula); //Se carga la información extendida sobre esa película.
            } catch (error) {
                informacionPelicula.innerHTML = "<p class='error'>Ha habido un error consultando la API</p>";
            }
        }
    });
}