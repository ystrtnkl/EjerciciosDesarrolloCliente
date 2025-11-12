"use strict";
import { validarNombreDisco, validarInterpreteOGrupo, validarAgno, validarGenero, validarLocalizacion } from "./bibliotecas/validaciones.js";
import { getTodosLosDiscos, guardarDiscos, borrarDisco, borrarTodosLosDiscos } from "./bibliotecas/persistencia.js";

//Se intenta que las manipulaciones del DOM estén en este script, mientras que funciones externas a este si están en las bibliotecas.
window.onload = () => {
    //Referencias usualmente necesitadas en el código.
    const formularioAgregar = document.forms.agregarDisco;
    const inputNombre = formularioAgregar.nombre;
    const inputGrupo = formularioAgregar.grupo;
    const inputCaratula = formularioAgregar.caratula;
    const inputAgno = formularioAgregar.agno;
    const inputGeneros = formularioAgregar.genero;
    const fieldSetGeneros = formularioAgregar.generos;
    const inputLocalizacion = formularioAgregar.localizacion;
    const inputPrestado = formularioAgregar.prestado;
    const mensajesError = document.getElementById("mensajes-error");
    const listaDiscos = document.getElementById("mostrar-discos");
    const filtros = document.getElementById("filtro");

    //Devuelve un array con los géneros seleccionados en formato texto.
    const getGenerosSeleccionados = () => {
        //Convierte el RadioNodeList en array, luego filtra los que tengan checked y devuelve solo el valor, teniendo el array con los géneros.
        return Array.from(inputGeneros).filter((e) => e.checked).map((e) => e.value);
    }

    //Comprueba que los campos sean válidos, devuelve un array con un error por cada fallo (si devuelve [] es que no hay fallos) y muestra los errores.
    const comprobarCampos = () => {
        let errores = [];
        if (validarNombreDisco(inputNombre.value) === false) {
            inputNombre.classList.add("error");
            errores = [...errores, "El nombre del disco debe tener al menos 5 caracteres."];
        } else {
            inputNombre.classList.remove("error");
        }
        if (validarInterpreteOGrupo(inputGrupo.value) === false) {
            inputGrupo.classList.add("error");
            errores = [...errores, "El nombre del intérprete o grupo debe tener al menos 5 caracteres."];
        } else {
            inputGrupo.classList.remove("error");
        }
        if (validarAgno(inputAgno.value) === false && inputAgno.value !== '') {
            inputAgno.classList.add("error");
            errores = [...errores, "El año debe ser un entero entre 1000 y 9999 (no es obligatorio)."];
        } else {
            inputAgno.classList.remove("error");
        }
        if (validarLocalizacion(inputLocalizacion.value) === false) {
            inputLocalizacion.classList.add("error");
            errores = [...errores, "La localización debe cumplir el siguiente formato: [Dos mayúsculas]-[Tres cifras][Dos mayúsculas] (ejemplo: ES-001AA, ZR-512TR)."];
        } else {
            inputLocalizacion.classList.remove("error");
        }
        if (validarGenero(getGenerosSeleccionados()) === false) {
            fieldSetGeneros.classList.add("error");
            errores = [...errores, "Debes seleccionar al menos un género."];
        } else {
            fieldSetGeneros.classList.remove("error");
        }
        if (errores.length > 0) {
            mensajesError.classList.remove("oculto");
            mensajesError.innerHTML = errores.map((e) => `<li>${e}</li>`).join("");
        } else {
            mensajesError.classList.add("oculto");
            mensajesError.innerHTML = "";
        }
        //Se podría haber separado en dos funciones, una que valide los campos y otra que genere los errores, pero esto haría que el código fuese mucho más largo ya que habría que hacer una comprobación por cada campo para agregar o quitar la clase error.
        return errores;
    }
    //Se comprueban los campos cada vez que se cambian.
    //Se podría haber hecho que dependiendo del id de e.target se comprobase solo ese campo, pero conviene también tener una manera de comprobarlos todos a la vez (además si se comprueban todos cada vez, los errores también saldrán si se modifican los valores mediante Inspeccionar).
    formularioAgregar.addEventListener("change", comprobarCampos);

    //Actualiza la lista de discos (recibe por parámetro los discos a mostrar e nla lista).
    const actualizarLista = (lista) => {
        //Se agrega el disco al DOM similar a un componente de React.
        if (lista.length === 0) {
            listaDiscos.innerHTML = "<p>No hay discos guardados (o al menos no que coincidan con el filtro).</p>";
        } else {
            listaDiscos.innerHTML = lista.map((e) => {
                return `<div class="disco" id="${e.localizacion}">
                    <h3>${e.nombre ?? 'Sin nombre'}</h3>
                    <p>Intérprete o grupo: ${e.grupo ?? 'Sin intérprete o grupo'}</p>
                    ${e.agno === undefined || e.agno === '' ? `Sin año` : `<p>Año: ${e.agno}</p>`}
                    <p>Géneros: ${e.genero.join(", ")}</p>
                    <p>Localización: ${e.localizacion}</p>
                    <p>Prestado: ${e.prestado ? "Sí" : "No"}</p>
                    <button type="button" id="eliminar-${e.localizacion}"><img src="./assets/eliminar.png" alt="Eliminar"></button><br>
                    <img src="${e.caratula === undefined || e.caratula === '' ? './assets/sinportada.jpg' : e.caratula}" alt="Portada">
                </div>`
            }).join("");
        }
    }
    document.getElementById("boton-mostrar").addEventListener("click", () => {
        actualizarLista(getTodosLosDiscos());
    });
    actualizarLista(getTodosLosDiscos()); //En el ejercicio se especifica que los discos se deben cargar de un JSON en la carga de la página, interpreté que se refería a que se leyesen y se mostrasen en la lista.

    //Resetear el formulario y los errores.
    const reiniciarFormulario = () => {
        formularioAgregar.reset();
        mensajesError.classList.add("oculto");
        mensajesError.innerHTML = "";
        inputNombre.classList.remove("error");
        inputGrupo.classList.remove("error");
        inputAgno.classList.remove("error");
        fieldSetGeneros.classList.remove("error");
        inputLocalizacion.classList.remove("error");
    }
    document.getElementById("boton-limpiar").addEventListener("click", reiniciarFormulario);

    //Agregar la funcionalidad de eliminar discos
    listaDiscos.addEventListener("click", (e) => {
        if (e.target.id.startsWith("eliminar-")) {
            const identificador = e.target.id.replace("eliminar-", ""); //El botón tiene como id el identificador del disco a borrar.
            borrarDisco(identificador);
            //actualizarLista(getTodosLosDiscos());
            actualizarConFiltro(); //Se vuelve a actualizar la lista aplicando filtros ya que si se borraba un elemento con los filtros aplicados, si se actualiza de normal estos filtros se quitarían.
        }
    });

    //Comprueba que todos los campos estén bien, y si lo están lo guarda (no lo muestra, para eso está el botón de mostrar).
    document.getElementById("boton-guardar").addEventListener("click", () => {
        if (comprobarCampos().length === 0) {
            const nuevosDiscos = [{
                nombre: inputNombre.value,
                grupo: inputGrupo.value,
                agno: inputAgno.value,
                genero: getGenerosSeleccionados(),
                localizacion: inputLocalizacion.value,
                prestado: inputPrestado.checked,
                caratula: inputCaratula.value
            }];
            guardarDiscos(nuevosDiscos);
            reiniciarFormulario();
            //actualizarLista(getTodosLosDiscos()); //En el ejercicio se especifica que la lista de discos se muestre al pulsar el botón, no cada vez que se hace una modificación a la lista.
        }
    });

    //Botón para borrar todos los discos (limpiar).
    document.getElementById("boton-borrar-lista").addEventListener("click", () => {
        borrarTodosLosDiscos();
        actualizarLista([]);
    });

    //Función para aplicar los filtros (a los discos que están cargados en la página, no a los que están guardados).
    const actualizarConFiltro = () => {
        actualizarLista(getTodosLosDiscos().filter((e) => {
            //Filtra si el lo buscado se incluye o en el nombre o en el artista/grupo del disco.
            return e.nombre.toLowerCase().includes(filtros.value.toLowerCase()) || e.grupo.toLowerCase().includes(filtros.value.toLowerCase()) ;
        }));
    }
    document.getElementById("boton-filtrar").addEventListener("click", actualizarConFiltro);

    //Botón para revertir la búsqueda (quitar los filtros).
    document.getElementById("boton-reset-filtros").addEventListener("click", () => {
        filtros.value = "";
        actualizarLista(getTodosLosDiscos());
    });
}