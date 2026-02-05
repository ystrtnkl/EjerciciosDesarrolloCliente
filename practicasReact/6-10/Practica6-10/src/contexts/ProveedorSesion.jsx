import React, { createContext, useState, useEffect } from "react";
import { supabaseConexion } from '../supabase/supabase.js';
import { useNavigate, useLocation } from 'react-router-dom';
import useAutenticacionSupabase from "../hooks/useAutenticacionSupabase.js";

const ContextoSesion = createContext();

//Contexto encargado del manejo de la sesión de Supabase, usando su SDK personalizado para React.
const ProveedorSesion = (props) => {

  const ubicacion = useLocation();
  const [usuarioSesion, setUsuarioSesion] = useState({user: false}); //Datos de la sesión del usuario.
  const [sesionIniciada, setSesionIniciada] = useState(false); //true si el usuario ha iniciado sesión.
  const navegar = useNavigate();
  const { cargandoAutenticacion, errorAutenticacion, crearCuentaSupabase, iniciarSesionSupabase, cerrarSesionSupabase, obtenerUsuarioSupabase } = useAutenticacionSupabase();

  //Las siguientes funciones hacen uso de las de useAutenticacionSupabase pero además estableciendo los estados propios del contexto.

  //Inicia sesión con un correo y una contraseña.
  const iniciarSesion = async (correo, contrasegna) => {
    const resultado = await iniciarSesionSupabase(correo, contrasegna);
    if (typeof resultado !== "undefined") {
      setUsuarioSesion(resultado);
      setSesionIniciada(true);
      navegar("/gestor");
    }
  }

  //Mandar a crear una cuenta (tocará mirar el correo).
  const crearCuenta = async (nombre, correo, contrasegna) => {
    await crearCuentaSupabase(nombre, correo, contrasegna);
  }

  //Función para cerrar la sesión y borrar los datos e sesión.
  const cerrarSesion = async () => {
    if (await cerrarSesionSupabase()) {
      setSesionIniciada(false);
      setUsuarioSesion({user: false});
      navegar("/");
    }
  }

  const obtenerUsuario = async () => {
    const resultado = await obtenerUsuarioSupabase();
    if (typeof resultado !== "undefined") setUsuarioSesion(resultado);
  }

  useEffect(() => {
    //Listener para manejar los cambios de sesión, así como redirigir correctamente cuando se use el enlace en el correo de confirmación del email.
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          if (ubicacion.pathname === "/login" || ubicacion.pathname === "/registrarse") navegar("/gestor"); //Redirige a gestor cuando una sesión ya esté establecida, no intentarías hacer login o registrarte teniendo ya la sesión iniciada.
          setSesionIniciada(true);
          obtenerUsuario();
        } else {
          navegar("/login");
          setSesionIniciada(false);
        }
      }
    );
  }, []);

  const datosProveer = {
    crearCuenta, iniciarSesion, cerrarSesion, usuarioSesion, sesionIniciada, cargandoAutenticacion, errorAutenticacion, supabaseConexion
  }

  return (
    <>
      <ContextoSesion.Provider value={datosProveer}>
        {/*(!cargandoAutenticacion && typeof usuarioSesion?.user !== "undefined") ? props.children : (<Cargando />) Es posible que haga falta usar esta línea si está pensado usarse con conexiones muy lentas*/}
        {props.children}
      </ContextoSesion.Provider>
    </>
  );
};

export default ProveedorSesion;
export { ContextoSesion };