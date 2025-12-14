import { urlApi } from "./origenDatos.js";

//Similar a un componente de React, devuelve el texto HTML para crear un ítem en la lista de películas.
const htmlLiPelicula = (pelicula) => {
    return `<li id="${pelicula.episode_id}" class="pelicula">${pelicula.title ?? "Sin título"}</li>`;
}

//Similar a un componente de React, devuelve el texto HTML para mostrar los datos completos de una película concreta.
const htmlDatosPelicula = (pelicula) => {
    return `<h2 id="titulo">${pelicula.title ?? "Sin título"}</h2>
            <p id="sinopsis">${pelicula.opening_crawl.replaceAll("\\r\\n", "<br>") ?? "Sin descripción"}</p>
            <div>
                <p>Director(es): <span id="director">${pelicula.director ?? "Director desconocido"}</span></p>
                <p>Productor(es): <span id="productor">${pelicula.producer ?? "Productor desconocido"}</span></p>
                <p>Fecha de salida: <span id="fecha">${pelicula.release_date ?? "Fecha desconocida"}</span></p>
                <p>Número de episodio: ${pelicula.episode_id ?? "Desconocido"}</p>
                <p><a id="fecha" href="${pelicula.url ?? urlApi}">Más información</a></p>
            </div>`; 
    //Solo muestra los datos directos de la pelílcula, se omite información como los personajes, planetas, vehículos, naves, especies...
    //También habría estado bien mostrar la portada de la película, pero la API no ofrece eso.
}

export { htmlLiPelicula, htmlDatosPelicula }