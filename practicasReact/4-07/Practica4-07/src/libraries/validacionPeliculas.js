//Esta librería exporta un objeto con funciones de validación entre otras cosas para el json de películas.
//Algunas de las funciones son function y no () => {} porque hace uso del this.
const validaciones = {
    //Devuelve true si la película está bien formateada
    peliculaEsValida: function (pelicula) {
        if (typeof pelicula !== "object" || typeof pelicula.interpretes !== "object") {
            return false;
        }
        return pelicula.interpretes.filter((e) => { return !this.interpreteEsValido(e) }).length === 0
            && typeof pelicula.titulo === "string"
            && pelicula.titulo !== ""
            && typeof pelicula.id === "number"
            && pelicula.id >= 0
            && Array.isArray(pelicula.direccion)
            && typeof pelicula.resumen === "string"
            && typeof pelicula.urlPortada === "string"
            && pelicula.urlPortada !== ""
            && typeof pelicula.facturado === "number"
            && typeof pelicula.agnoExibicion === "number"
            && pelicula.agnoExibicion !== 0
            ? pelicula : false;
    },

    //Devuelve un array con solo las películas válidas.
    filtrarPeliculasValidas: function (listaPeliculas) {
        if (!Array.isArray(listaPeliculas)) {
            return [];
        }
        return [...listaPeliculas].filter((e) => {
            return this.peliculaEsValida(e)
        });
    },

    //Devuelve true si el intérprete está bien formateado.
    interpreteEsValido: (interprete) => {
        if (typeof interprete !== "object") {
            return false;
        }
        return (typeof interprete.nombre === "string"
            && interprete.nombre !== ""
            && typeof interprete.id === "number"
            && interprete.id >= 0
            && typeof interprete.biografia === "string"
            && typeof interprete.urlImagen === "string"
            && interprete.urlImagen !== "");
    },

    //Devuelve un array de todos los intérpretes válidos de una lista de películas.
    filtrarInterpretesValidos: function (listaPeliculas) {
        const peliculas = this.filtrarPeliculasValidas(listaPeliculas);
        const interpretes = peliculas.map((e) => {
            return e.interpretes.filter((ee) => {
                return this.interpreteEsValido(ee);
            });
        });
        return [...interpretes.flat().sort((a, b) => { return a.id > b.id })];
    },

    //Devuelve un array con todas las portadas de las películas bien formateadas.
    listadoPortadas: function (listaPeliculas) {
        const peliculas = this.filtrarPeliculasValidas(listaPeliculas);
        const portadas = peliculas.map((e) => {
            return e.urlPortada;
        });
        return [...portadas];
    }
}

export default validaciones;