import React, { useContext } from "react";
import { ContextoListas } from "../contexts/ProveedorListas.jsx";

//Hook personalizado intermedio para interactuar con el contexto. Esta hecho en caso de que haya que alterar la manera en la que se hace esto, para que no se tenga que refactorizar todos los componentes.
const useListas = () => {

  const contexto = useContext(ContextoListas);

  if (!contexto) {
    //Aun así, requiere que el componente que use el hook esté dentro del proveedor del contexto, si no dará error.
    throw "El componente debe estar dentro del proveedor del contexto";
  }

  return contexto;
};

export default useListas;
