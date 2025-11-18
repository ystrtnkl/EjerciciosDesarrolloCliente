import React, { useState } from 'react';
import './FormularioInsercionDisco.css';

const FormularioInsercionDisco = (props) => {

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
        if () {

        }
        setDisco({...disco, genero:[].});
    }

  return (
    <form>
        <img src={disco.caratula === "" ? "#" : disco.caratula} alt="" />
        <br />
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" placeholder='Nombre del disco' onChange={(e) => {actualizarDatos(e);}} value={disco.nombre ?? ''} />
        <br />
        <label htmlFor="caratula">Carátula (URL):</label>
        <input type="text" name="caratula" id="nombre" placeholder='https://imagenes.com/1.png' onChange={(e) => {actualizarDatos(e);}} value={disco.caratula ?? ''} />
        <br />
        <label htmlFor="grupo">Grupo o intérprete:</label>
        <input type="text" name="grupo" id="grupo" placeholder='Nombre del artista o artistas' onChange={(e) => {actualizarDatos(e);}} value={disco.grupo ?? ''} />
        <br />
        <label htmlFor="agno">Año de publicación:</label>
        <input type="number" name="agno" id="agno" placeholder='2025' onChange={(e) => {actualizarDatos(e);}} value={disco.agno ?? ''} min="1000"/>
        <br />
        <fieldset name="generos" id="generos">
            <legend>Géneros</legend>
            <label htmlFor="genero-pop">Pop</label>
            <input type="checkbox" id="genero-pop" name="genero" value="pop" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-rock">Rock</label>
            <input type="checkbox" id="genero-rock" name="genero" value="rock" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-metal">Metal</label>
            <input type="checkbox" id="genero-metal" name="genero" value="metal" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-house">House</label>
            <input type="checkbox" id="genero-house" name="genero" value="house" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-clasica">Clásica</label>
            <input type="checkbox" id="genero-clasica" name="genero" value="clasica" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-musical">Musical</label>
            <input type="checkbox" id="genero-musical" name="genero" value="musical" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-country">Country</label>
            <input type="checkbox" id="genero-country" name="genero" value="country" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-oriental">Oriental</label>
            <input type="checkbox" id="genero-oriental" name="genero" value="oriental" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-indie">Indie</label>
            <input type="checkbox" id="genero-indie" name="genero" value="indie" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-opera">Ópera</label>
            <input type="checkbox" id="genero-opera" name="genero" value="opera" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-chiptune">Chiptune</label>
            <input type="checkbox" id="genero-chiptune" name="genero" value="chiptune" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
            <label htmlFor="genero-experimental">Experimental</label>
            <input type="checkbox" id="genero-experimental" name="genero" value="experimental" onChange={(e) => {actualizarDatosGenero(e);}} checked={disco.genero.contains(this.value)} /><br />
        </fieldset>
        <label htmlFor="localizacion">Localización (código como AA-BB-4737):</label>
        <input type="text" name="localizacion" id="localizacion" placeholder='AA-BB-4737' onChange={(e) => {actualizarDatos(e);}} value={disco.localizacion ?? ''} />
        <br />
        <label htmlFor="prestado">Prestado: </label>
        <input type="checkbox" id="prestado" name="prestado" value="prestado" onChange={(e) => {actualizarDatos(e);}} checked={disco.prestado === true} /><br />
        <input type="button" name="guardar" value="Guardar" id="guardar" onClick={() => {props.guardar();}} />
        <p>{JSON.stringify(disco)}</p>
    </form>
  )
}

export default FormularioInsercionDisco;

