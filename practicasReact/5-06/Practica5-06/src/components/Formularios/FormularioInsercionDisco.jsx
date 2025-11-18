import React, { useState } from 'react';
import './FormularioInsercionDisco.css';
import InputCheckCompleto from './InputCheckCompleto.jsx';
import InputTextCompleto from './InputTextCompleto.jsx';
import { validarNombreDisco, validarInterpreteOGrupo, validarAgno, validarGenero, validarLocalizacion, validarDisco } from '../../libraries/validaciones.js';

const FormularioInsercionDisco = (props) => {

    const posiblesGeneros = ["pop", "rock", "metal", "house", "clasica", "musical", "country", "oriental", "indie", "opera", "chiptune", "experimental"];
    const posiblesGenerosTitulos = ["Pop", "Rock", "Metal", "House", "Clásica", "Musical", "Country", "Oriental", "Indie", "Ópera", "Chiptune", "Experimental"];

    const [disco, setDisco] = useState({
        nombre: "",
        caratula: "",
        grupo: "",
        agno: "",
        genero: [],
        localizacion: "",
        prestado: false
    });

    const actualizarDatos = (e) => {
        if (e.target.type === "checkbox") {
            setDisco({...disco, [e.target.name]: e.target.checked === true});
        } else {

            setDisco({...disco, [e.target.name]: e.target.value});
        }
    }

    const actualizarDatosGenero = (e) => {


        //validAR VALIDAR AAODEFIUASYODFSAIFUASYTDFIUOSTYD


        if (!e.target.checked) {
            let nuevosGeneros = [...disco.genero].filter((ee) => {return ee !== e.target.name});
            setDisco({...disco, genero:nuevosGeneros});
        } else {
            setDisco({...disco, genero: [...disco.genero, e.target.name]});
        }
    }

  return (
    <form>
        <img src={disco.caratula === "" ? "#" : disco.caratula} alt="" />
        <br />
        <InputTextCompleto titulo="Localización:" nombre="localizacion" ejemplo="ES-001AA" valor={disco.localizacion} actualizarValor={actualizarDatos} error="La localización debe tener este formato: ES-(tres cifras)(dos letras mayúsculas)" validacion={validarLocalizacion} />
        <InputTextCompleto titulo="Nombre:" nombre="nombre" ejemplo="Nombre del disco" valor={disco.nombre} actualizarValor={actualizarDatos} error="El nombre debe de tener al menos 5 carácteres." validacion={validarNombreDisco} />
        <InputTextCompleto titulo="Carátula (URL):" nombre="caratula" ejemplo="https://example.com/1.png" valor={disco.caratula} actualizarValor={actualizarDatos} />
        <InputTextCompleto titulo="Grupo o intérprete:" nombre="grupo" ejemplo="Nombre del artista o artistas" valor={disco.grupo} actualizarValor={actualizarDatos} error="El nombre debe de tener al menos 5 carácteres." validacion={validarInterpreteOGrupo} />
        <InputTextCompleto tipo="number" titulo="Año de publicación:" nombre="agno" ejemplo="2025" valor={disco.agno} actualizarValor={actualizarDatos} error="El año debe ser un entero mayor que 999 (o vacío ya que es opcional)." validacion={validarAgno} />
        <fieldset name="generos" id="generos">
            <legend>Géneros</legend>
            {posiblesGeneros.map((e, i) => {
                return (<InputCheckCompleto key={i} idFormateado={"genero-" + e} valor={e} titulo={posiblesGenerosTitulos[i]} actualizarValor={actualizarDatosGenero} estaChecked={disco.genero.includes(e)} />)
            })}
        </fieldset>
        <label htmlFor="prestado">Prestado: </label>
        <input type="checkbox" id="prestado" name="prestado" value="prestado" onChange={(e) => {actualizarDatos(e);}} checked={disco.prestado === true} /><br />
        <input type="button" name="guardar" value="Guardar" id="guardar" onClick={() => { if (validarDisco(disco)) {props.guardar(disco)} }} />
        <p className="oculto error">Hay datos invalidos</p>
        <p>{JSON.stringify(disco)}</p>
    </form>
  )
}

export default FormularioInsercionDisco;

