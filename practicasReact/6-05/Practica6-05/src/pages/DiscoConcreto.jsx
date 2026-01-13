import React from "react";
import ListaDiscos from "../components/Discos/ListaDiscos.jsx";
import { useParams } from "react-router-dom";
import useDiscos from "../hooks/useDiscos.js";
import imgCargando from '../assets/cargando.gif';
import { getError } from "../libraries/traducir.js";

//Página donde se muestra un solo disco en concreto.
function DiscoConcreto() {

  const { uuid } = useParams(); //Dicho disco se especifica mediante la URL.
  const { borrarDisco, error, cargando, discosCargados } = useDiscos(); //Usa el hook intermedio para el contexto de discos para apropiarse de los estados.

  return (
    <>
      <h2>Lista de discos.</h2>
      {/*Se muestra solo el disco que coincida con el UUID pasado por la URL.*/}
      {cargando ? (<img src={imgCargando} alt="Cargando..." />) : (error ? (<p>{getError("es", "errorDiscosNinguno")}</p>) : (<ListaDiscos borrarDisco={borrarDisco} discosCargados={discosCargados.filter((e)=>{return e.id === uuid})} filtros={true} />))}
    </>
  )
}

export default DiscoConcreto;
