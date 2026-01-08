import React, { useState, useRef } from 'react';
import './FormularioInsercionDisco.css';
import InputCheckCompleto from './InputCheckCompleto.jsx';
import InputTextCompleto from './InputTextCompleto.jsx';
import { validarNombreDisco, validarInterpreteOGrupo, validarAgno, validarGenero, validarLocalizacion, validarDisco } from '../../libraries/validaciones.js';

const FormularioInsercionDisco = (props) => {

    //Nombres y valores de todos los posibles géneros de música.
    const posiblesGeneros = ["pop", "rock", "metal", "house", "clasica", "musical", "country", "oriental", "indie", "opera", "chiptune", "experimental"];
    const posiblesGenerosTitulos = ["Pop", "Rock", "Metal", "House", "Clásica", "Musical", "Country", "Oriental", "Indie", "Ópera", "Chiptune", "Experimental"];
    const estadoInicial = { //Como empezará el estado manejador del formulario.
        nombre: "",
        caratula: "",
        grupo: "",
        agno: "",
        genero: [],
        localizacion: "",
        prestado: false
    };
    //useRef para manejar los mensajes volátiles de éxito y error.
    const mensajeExito = useRef(null);
    const mensajeError = useRef(null);

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
        if (validarDisco(disco)) { //Se guardará solo si el disco entero es válido
            props.guardar(disco);
            resetear();
            mensajeExito.current.classList.remove("oculto");
            setTimeout(() => { //Timeouts tanto en éxito como error para mostrar mensajes volátiles.
                mensajeExito.current.classList.add("oculto");
            }, 2000);
        } else {
            mensajeError.current.classList.remove("oculto");
            setTimeout(() => {
                mensajeError.current.classList.add("oculto");
            }, 2000);
        }
    }

    return (
        <form name="insertarDisco">
            {/*Se puede probar la URL de la imágen de la carátula a tiempo real.*/}
            <img src={disco.caratula === "" ? "#" : disco.caratula} alt="" />
            <br />
            <InputTextCompleto titulo="Localización:" nombre="localizacion" ejemplo="ES-001AA" valor={disco.localizacion} actualizarValor={actualizarDatos} error="La localización debe tener este formato: ES-(tres cifras)(dos letras mayúsculas)" validacion={validarLocalizacion} />
            <InputTextCompleto titulo="Nombre:" nombre="nombre" ejemplo="Nombre del disco" valor={disco.nombre} actualizarValor={actualizarDatos} error="El nombre debe de tener al menos 5 carácteres." validacion={validarNombreDisco} />
            <InputTextCompleto titulo="Carátula (URL):" nombre="caratula" ejemplo="https://example.com/1.png" valor={disco.caratula} actualizarValor={actualizarDatos} />
            <InputTextCompleto titulo="Grupo o intérprete:" nombre="grupo" ejemplo="Nombre del artista o artistas" valor={disco.grupo} actualizarValor={actualizarDatos} error="El nombre debe de tener al menos 5 carácteres." validacion={validarInterpreteOGrupo} />
            <InputTextCompleto tipo="number" titulo="Año de publicación:" nombre="agno" ejemplo="2025" valor={disco.agno} actualizarValor={actualizarDatos} error="El año debe ser un entero mayor que 999 (o vacío ya que es opcional)." validacion={validarAgno} />
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
            <p className="bien oculto" ref={mensajeExito}>Disco guardado correctamente.</p>
            <p className="mal oculto" ref={mensajeError}>El formulario tiene errores, revísalos.</p>
        </form>
    )
}

export default FormularioInsercionDisco;

