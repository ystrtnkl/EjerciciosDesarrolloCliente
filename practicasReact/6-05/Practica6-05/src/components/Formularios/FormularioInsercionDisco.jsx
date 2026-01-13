import React, { useState } from 'react';
import './FormularioInsercionDisco.css';
import InputCheckCompleto from './InputCheckCompleto.jsx';
import InputTextCompleto from './InputTextCompleto.jsx';
import { validarNombreDisco, validarInterpreteOGrupo, validarAgno, validarGenero, validarLocalizacion } from '../../libraries/validaciones.js';

const FormularioInsercionDisco = (props) => {

    //Nombres y valores de todos los posibles géneros de música (duplicado por las tildes).
    const posiblesGeneros = ["pop", "rock", "metal", "house", "clasica", "musical", "country", "oriental", "indie", "opera", "chiptune", "experimental"];
    const posiblesGenerosTitulos = ["Pop", "Rock", "Metal", "House", "Clásica", "Musical", "Country", "Oriental", "Indie", "Ópera", "Chiptune", "Experimental"];
    const estadoInicial = { //Como empezará el estado manejador del formulario.
        nombre: props.previo?.nombre ?? "",
        caratula: props.previo?.caratula ?? "",
        grupo: props.previo?.grupo ?? "",
        agno: props.previo?.agno ?? "",
        genero: props.previo?.genero ?? [],
        localizacion: props.previo?.localizacion ?? "",
        prestado: props.previo?.prestado ?? false
    };
    //Mensajes temporales de error y éxito.
    const [mensajeExito, setMensajeExito] = useState(false);
    const [mensajeError, setMensajeError] = useState(false);

    //Estado de un disco, que en realidad son los valores actuales del formulario.
    const [disco, setDisco] = useState(estadoInicial);

    //Se ejecuta cada vez que un input cambia su valor.
    const actualizarDatos = (e) => {
        if (e.target.type === "checkbox") {
            setDisco({ ...disco, [e.target.name]: e.target.checked === true }); //Si es un checkbox se guarda su checked.
        } else {
            setDisco({ ...disco, [e.target.name]: e.target.value }); //Si es otro tipo de input, se guarda su valor.
        }
    }

    //Se ejecuta cada vez que un checkbox de género cambie, en este caso almacena o elimina dicho género del array del estado.
    const actualizarDatosGenero = (e) => {
        if (!e.target.checked) {
            setDisco({ ...disco, genero: [...disco.genero].filter((ee) => { return ee !== e.target.name }) });
        } else {
            setDisco({ ...disco, genero: [...disco.genero, e.target.name] });
        }
    }

    //Reiniciar estado y formulario.
    const resetear = () => {
        setDisco(estadoInicial);
    }

    //Cuando se clique en guardar.
    const guardar = () => {
        if (props.validador(disco)) { //Se guardará en base al validador pasado por props (puede que valide todo o solo lo que está escrito).
            if (props.editando) { //En caso de ser un formulario de edición y no de inserción
                //Los valores "" reemplazarían a los originales en la API, estableciéndolos como undefined hará que no se alteren en la base de datos (método patch).
                let discoPatch = { ...disco };
                for (let e in discoPatch) {
                    if (discoPatch[e] === "") discoPatch[e] = undefined;
                    if (discoPatch[e] === "NUL") discoPatch[e] = ""; //En caso de querer borrar un valor, se pide al usuario que escriba NUL.
                }
                props.guardar(discoPatch);
            } else {
                props.guardar([disco]); //En caso de ser un formulario de inserción, se guarda el objeto entero.
            }
            resetear();
            setMensajeExito(true);
            console.log("a")
            setTimeout(() => { //Timeouts tanto en éxito como error para mostrar mensajes volátiles.
                setMensajeExito(false);
                console.log("b")
            }, 2000);
        } else {
            setMensajeError(true);
            setTimeout(() => {
                setMensajeError(false);
            }, 2000);
        }
    }

    return (
        <form name="insertarDisco">
            {/*Se puede probar la URL de la imágen de la carátula a tiempo real.*/}
            {mensajeExito && (<p className="bien">Disco guardado correctamente.</p>)}
            {mensajeError && (<p className="mal">El formulario tiene errores, revísalos.</p>)}
            <img src={disco.caratula === "" ? "#" : disco.caratula} alt="" />
            <br />
            <InputTextCompleto titulo="Localización:" nombre="localizacion" ejemplo={props.previo?.localizacion ?? "ES-001AA"} valor={disco.localizacion} actualizarValor={actualizarDatos} error="La localización debe tener este formato: ES-(tres cifras)(dos letras mayúsculas)" validacion={validarLocalizacion} />
            <InputTextCompleto titulo="Nombre:" nombre="nombre" ejemplo={props.previo?.nombre ?? "Nombre del disco"} valor={disco.nombre} actualizarValor={actualizarDatos} error="El nombre debe de tener al menos 5 carácteres." validacion={validarNombreDisco} />
            <InputTextCompleto titulo="Carátula (URL):" nombre="caratula" ejemplo={props.previo?.caratula ?? "https://example.com/1.png"} valor={disco.caratula} actualizarValor={actualizarDatos} />
            <InputTextCompleto titulo="Grupo o intérprete:" nombre="grupo" ejemplo={props.previo?.grupo ?? "Nombre del artista o artistas"} valor={disco.grupo} actualizarValor={actualizarDatos} error="El nombre debe de tener al menos 5 carácteres." validacion={validarInterpreteOGrupo} />
            <InputTextCompleto tipo="number" titulo="Año de publicación:" nombre="agno" ejemplo={props.previo?.agno ?? "2025"} valor={disco.agno} actualizarValor={actualizarDatos} error="El año debe ser un entero mayor que 999 (o vacío ya que es opcional)." validacion={validarAgno} />
            <fieldset name="generos" id="generos">
                <legend>Géneros</legend>
                {/*Los checkbox de los géneros se agregan dinámicamente a partir del array de géneros*/}
                {posiblesGeneros.map((e, i) => {
                    return (<InputCheckCompleto key={i} idFormateado={"genero-" + e} valor={e} titulo={posiblesGenerosTitulos[i]} actualizarValor={actualizarDatosGenero} estaChecked={disco.genero.includes(e)} />)
                })}
                <p className={validarGenero(disco.genero) ? "oculto" : "mal"}>Debes elegir al menos un género de música.</p>
            </fieldset>
            <label htmlFor="prestado">Prestado: </label>
            <input type="checkbox" id="prestado" name="prestado" value="prestado" onChange={(e) => { actualizarDatos(e); }} checked={disco.prestado === true} /><br />
            <input type="button" name="guardar" value="Guardar" id="guardar" onClick={guardar} />
            <input type="button" name="reset" value="Reiniciar" id="reset" onClick={resetear} />
            {props.editando && (<p>Escribe NUL para dejarlo en blanco</p>)}
        </form>
    )
}

export default FormularioInsercionDisco;

