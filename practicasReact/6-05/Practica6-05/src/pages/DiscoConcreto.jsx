import React from "react";
import ListaDiscos from "../components/Discos/ListaDiscos.jsx";
import { useParams } from "react-router-dom";
import useDiscos from "../hooks/useDiscos.js";
import imgCargando from '../assets/cargando.gif';

//Página donde se muestra un solo disco en concreto.
function DiscoConcreto() {

  const { uuid } = useParams(); //Dicho disco se especifica mediante la URL.
  const { borrarDisco, error, cargando, discosCargados } = useDiscos();

  //NOTA: este componente hace la carga del contexto y devuelve al componente de lista solo el disco que corresponde con el uuid. Lo malo es que cada vez que se llama a useDiscos, se inicializa el contexto y se hace la petición para todos los discos, aunque no sea necesario.
  //En el otro componente (en el que se muestran todos los discos) esto está bien, pero aquí solo hace falta cargar 1. Si se pudiese especificar por parámetros o de alguna otra manera cuantos discos (uno específico o todos) debe cargar el contexto al inicializarse, esto no ocurriría.
  //Por defecto el contexto carga todos los discos en su useEffect, no se le puede especificar no hacerlo.
  return (
    <>
      <h2>Lista de discos.</h2>
      {cargando ? (<img src={imgCargando} alt="Cargando..." />) : (error ? (<p>Ha habido un error o no se han encontrado discos</p>) : (<ListaDiscos borrarDisco={borrarDisco} discosCargados={discosCargados.filter((e)=>{return e.id === uuid})} filtros={true} />))}
    </>
  )
}

export default DiscoConcreto;
