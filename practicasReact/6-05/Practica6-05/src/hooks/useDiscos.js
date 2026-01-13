import React, { useContext } from "react";
import { ContextoDiscos } from "../contexts/ProveedorDiscos.jsx";
import { getError } from "../libraries/traducir.js";

//Hook personalizado intermedio para interactuar con el contexto de discos. Esta hecho en caso de que haya que alterar la manera en la que se hace esto, para que no se tenga que refactorizar todos los componentes.
const useDiscos = () => {

  const contexto = useContext(ContextoDiscos);

  if (!contexto) {
    //Aun así, requiere que el componente que use el hook esté dentro del proveedor del contexto, si no dará error.
    throw new Error(getError("es", "errorContexto"));
  }

  return contexto;
};

export default useDiscos;
