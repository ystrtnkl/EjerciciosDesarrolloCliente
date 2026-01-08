import React, { useState, useEffect, createContext } from "react";

const ContextoDiscos = createContext();

const ProveedorDiscos = (props) => {
  
  const datosAProveer = {

  };

  return (
    <>
      <ContextoDiscos.Provider value={datosAProveer}>
        {props.children}
      </ContextoDiscos.Provider>
    </>
  );
};

export default ProveedorDiscos;
export { ContextoDiscos };