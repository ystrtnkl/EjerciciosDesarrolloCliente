import { urlApi } from "./origenDatos.js";

const htmlLiPelicula = (pelicula) => {
    return `<li id="${pelicula.episode_id}" class="pelicula">${pelicula.id}: ${pelicula.title ?? "Sin título"}</li>`;
}

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
}

export { htmlLiPelicula, htmlDatosPelicula }