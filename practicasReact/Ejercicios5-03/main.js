"use strict";
import { generarTabla, colorEsOscuro } from "./bibliotecas/ejercicio1.js";

window.onload = () => {
    //Hacer esto agregará un elemento llamado tbody dentro de la tabla, el cual contendrá todas las celdas. Se hace incluso cuando no se pidió que se haga pero realmente no es un problema.
    const lienzoWrapper = document.getElementById("lienzo");
    lienzoWrapper.innerHTML = generarTabla(60, 60);

    //Funcionalidad para alternar la visibilidad de la cuadrícula.
    document.getElementById("cuadricula").addEventListener("click", () => {
        lienzoWrapper.classList.toggle("con-cuadricula");
    });

    //Funcionalidad para resetear el lienzo a un tamaño específico.
    const selectorTamagnoX = document.getElementById("x");
    const selectorTamagnoY = document.getElementById("y");
    document.getElementById("resetear").addEventListener("click", () => {
        //Se vuelven a recoger los values y los elementos en caso de que hayan cambiado.
        const x = parseInt(selectorTamagnoX.value) ?? 60;
        const y = parseInt(selectorTamagnoY.value) ?? 60;
        //En lugar de poner todos los píxeles en blanco, se vuelve a hacer la tabla con el tamaño que quiera el usuario
        lienzoWrapper.innerHTML = generarTabla(x, y);
    });

    //Funcionalidad para agregar un color nuevo.
    const selectorColor = document.getElementById("color-personalizado");
    const listaColores = document.getElementById("lista-colores");
    document.getElementById("agregar").addEventListener("click", () => {
        const color = selectorColor.value;
        //Se puede saber si un color es claro o no, pero no se puede saber su nombre concreto sin librerías externas o grandes tablas de colores, así que se usa su código hexadecimal.
        listaColores.innerHTML += `<li><span style="color: ${color}" class="bala bala-${colorEsOscuro(color) ? 'oscura' : 'clara'}">⬤</span>${color}</li>`;
    });

    //Funcionalidad para cambiar el fondo.
    const colorFondo = document.getElementById("fondo-personalizado");
    const indicadorFondo = document.getElementById("indicador-fondo");
    const balaBorrar = listaColores.children[0].children[0];
    document.getElementById("cambiar-fondo").addEventListener("click", () => {
        lienzoWrapper.setAttribute("style", `background-color: ${colorFondo.value};`);
        indicadorFondo.innerHTML = colorFondo.value;
        //También se cambia el color equivalente a borrar.
        balaBorrar.setAttribute("style", `color: ${colorFondo.value};`);
        balaBorrar.setAttribute("style", `color: ${colorFondo.value};`);
        balaBorrar.classList.remove("bala-clara");
        balaBorrar.classList.remove("bala-oscura");
        balaBorrar.classList.add(`bala-${colorEsOscuro(colorFondo.value) ? 'oscura' : 'clara'}`);
    });

    //Funcionalidad para escoger colores.
    let colorActual = "#000000"; //Esta variable contiene el color seleccionado.
    listaColores.addEventListener("click", (e) => {

        if (e.target.tagName === "LI") {
            if (e.target.id === "borrador") {
                colorActual = "transparent";
            } else {
                //Se sabe revisando mediante regex el innerHTML del <li> (sí o sí debe contener un color hexadecimal).
                colorActual = e.target.innerHTML.match(/#[0-9a-fA-F]{6}/)[0];
            }
            for (let i = 0; i <= listaColores.children.length; i++) {
                if (listaColores.children[i] instanceof HTMLElement) {
                    listaColores.children[i].classList.remove("color-seleccionado");
                }
            }
            e.target.classList.add("color-seleccionado");
        }
    });

    //Funcionalidad para dibujar en el lienzo.
    let pintando = false; //Para saber si se está pintando en el momento que se arrastre el clic.
    //Levantar el clic = dejar de pintar.
    lienzoWrapper.addEventListener("mouseup", () => {
        pintando = false;
    });
    //Cuando esté pulsado el clic = está pintando.
    lienzoWrapper.addEventListener("mousedown", () => {
        pintando = true;
    });
    //Si el ratón está por encima, cambiará el color de los píxeles según la variable pintando.
    lienzoWrapper.addEventListener("mouseover", (e) => {
        if (pintando && e.target.tagName === "TD") {
            //Se usa aquí (y en otras partes de la página) la propiedad style (que no está recomendada) para soportar cualquier color y no tener que hacer una clase por cada uno.
            e.target.setAttribute("style", `background-color: ${colorActual};`);
        }
    });
    //En caso de querer pintar píxeles individuales, se puede hacer clicando de manera individual.
    lienzoWrapper.addEventListener("click", (e) => {
        if (e.target.tagName === "TD") {
            e.target.setAttribute("style", `background-color: ${colorActual};`);
        }
    });
}