"use strict";

//Código para el ejercicio 4:
setTimeout(() => {
    const imagenes = [
        "https://i.ibb.co/prPQL0rm/imagen1.png",
        "https://i.ibb.co/z1rQ209/imagen2.png",
        "https://i.ibb.co/x8PQjhwD/imagen3.png",
        "https://i.ibb.co/mF6nfmxg/imagen4.png"
    ]; //El código está adaptado para soportar cualquier número de imágenes.
    const imagen = document.getElementById("imagen");
    imagen.setAttribute("src", imagenes[0]);
    let indice = 1;
    setInterval(() => {
        imagen.setAttribute("src", imagenes[indice]);
        indice++;
        if (indice >= imagenes.length) {
            indice = 0;
        }

        //Manera de llamar manualmente a la animación, ya que CSS no detecta los cambios de src en el <img>.
        imagen.classList.add("animar");
        setTimeout(() => {
            imagen.classList.remove("animar");
        }, 500);
    }, 2000);
}, 2000);