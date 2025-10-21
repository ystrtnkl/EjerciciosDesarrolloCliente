const validaciones = {
    filtrarPeliculasValidas: (listaPeliculas) => {
    
        return listaPeliculas;
    },

    peliculaEsValida: (pelicula) => {

        return pelicula ?? false;
    },

    interpreteEsValido: (interprete) => {
        
        return true;
    },
    filtrarInterpretesValidos: function (listaPeliculas) {
        const peliculas = this.filtrarPeliculasValidas(listaPeliculas);
        const interpretes = peliculas.map((e) => {
            return e.interpretes.filter((ee) => {
                return this.interpreteEsValido(ee);
            });
        });
        return [...interpretes.flat()];
    },
    listadoPortadas: function (listaPeliculas) {
        const peliculas = this.filtrarPeliculasValidas(listaPeliculas);
        const portadas = peliculas.map((e) => {
            return e.urlPortada;
        });
        return [...portadas];
    }
} 


export default validaciones;