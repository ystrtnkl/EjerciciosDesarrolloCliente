import React, { useContext } from "react";
import { ContextoSesion } from "../contexts/ProveedorSesion.jsx";

//Hook personalizado intermedio para interactuar con el contexto. Esta hecho en caso de que haya que alterar la manera en la que se hace esto, para que no se tenga que refactorizar todos los componentes.
const useSesion = () => {

  const contexto = useContext(ContextoSesion);

  if (!contexto) {
    //Aun así, requiere que el componente que use el hook esté dentro del proveedor del contexto, si no dará error.
    throw "El componente debe estar dentro del proveedor del contexto";
  }

  return contexto;
};

export default useSesion;
