import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSesion from '../hooks/useSesion.js';
import GestorListas from '../components/Gestor/GestorListas.jsx';
import ProveedorProductos from '../contexts/ProveedorProductos.jsx';
import useProductos from '../hooks/useProductos.js';

//Esta página será exclusiva para usuarios con la sesión iniciada.
function Gestor() {

  const navegar = useNavigate();
  const { sesionIniciada, usuarioSesion } = useSesion();
  useEffect(() => {
    //Si no ha iniciado sesión redirige inmediatamente a login.
    //if (!sesionIniciada) navegar("/login");
  }, []); //EXCLUSIVO O NO ¿?¿?¿?¿?¿?¿?
  //CARGA 50 VS CARGA 1 ¿?¿?¿?¿?¿?

  return (
    <>
        <h2>Gestor de listas de la compra</h2>
        <ProveedorProductos>{/*Los productos solo serán usados aquí.*/}
        {/*sesionIniciada &&*/ (<GestorListas usuario={usuarioSesion?.user} logeado={sesionIniciada} />)}
        </ProveedorProductos>
    </>
  )
}

export default Gestor;
