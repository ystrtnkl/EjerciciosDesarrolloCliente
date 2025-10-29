//Función que a un elemento HTML, agrega un evento que alterna la visibilidad del siguiente elemento hermano.
const agregarEventoDespliegue = (elemento) => {
    //Se entendió que "elemento inmediatamente inferior a él" se refería a su siguiente hermano y no a su hijo, ya que se renderizan de arriba a abajo.
    //Para que en su lugar aplique el evento al hijo del elemento, habría que cambiar nextElementSibling por firstChild (así como modificar el HTML).
    if (elemento instanceof HTMLElement && elemento.nextElementSibling !== null) {
        elemento.addEventListener("click", () => {
            elemento.nextElementSibling.classList.toggle("oculto");
        });
    }
}

export { agregarEventoDespliegue }