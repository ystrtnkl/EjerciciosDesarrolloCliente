import React, { useContext } from "react";
import { ContextoDiscos } from "../contexts/ProveedorDiscos.jsx";

const useDiscos = () => {

  const contexto = useContext(ContextoDiscos);

  if (!contexto) {
    throw new Error(
      "El hook useDiscentes debe ser utilizado dentro de <ProveedorDiscentes>."
    );
  }

  return contexto;
};

export default useDiscos;