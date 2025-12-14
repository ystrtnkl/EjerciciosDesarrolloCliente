"use strict";

window.onload = () => {
    //El evento se aplica al elemento padre para no hacer un evento por cada desplegable.
    document.getElementsByTagName("MAIN")[0].addEventListener("click", (e) => {
        //El ejercicio dice que son los elementos pares los que reaccionan al evento (independientemente de su clase), así que se comprueba si coincide con este selector CSS (similar a querySelector).
        if (e.target.matches("main div:nth-child(odd)")) {
            //Se entendió que "elemento inmediatamente inferior a él" se refería a su siguiente hermano y no a su hijo, ya que se renderizan de arriba a abajo.
            //Para que en su lugar aplique el cambio al hijo del elemento, habría que cambiar nextElementSibling por firstChild (así como modificar el HTML).
            e.target.nextElementSibling.classList.toggle("oculto");
        }
    });
}