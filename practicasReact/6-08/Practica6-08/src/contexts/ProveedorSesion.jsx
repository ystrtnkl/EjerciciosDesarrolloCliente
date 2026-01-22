import React, { createContext, useState, useEffect } from "react";
import { supabaseConexion, URL_APP } from '../supabase/supabase.js';
import { useNavigate, useLocation } from 'react-router-dom';

const ContextoSesion = createContext();

//Contexto encargado del manejo de la sesión de Supabase, usando su SDK personalizado para React.
const ProveedorSesion = (props) => {

  const ubicacion = useLocation();
  const [cargando, setCargando] = useState(false);
  const [errorSupabase, setErrorSupabase] = useState("");
  const [usuarioSesion, setUsuarioSesion] = useState({}); //Datos de la sesión del usuario.
  const [sesionIniciada, setSesionIniciada] = useState(false); //true si el usuario ha iniciado sesión.
  const navegar = useNavigate();

  //La app está diseñada de tal manera que los errores con la sesión Supabase aparezcan en toda la aplicación (a modo de notificaicón toast), así que son visibles por todos los componentes pero solo duran 4 segundos.
  //Sin embargo, el código css para mostrar dichos errores en una esquina no está implementado, pero bastaría con definir alguna clase.
  const establecerError = (error) => {
    setErrorSupabase(error);
    setTimeout(() => {
      setErrorSupabase("");
    }, 4000);
  }

  //Intenta crear una cuenta a partir del nombre, correo y contraseña. 
  const crearCuenta = async (nombre, correo, contrasegna) => {
    setErrorSupabase("");
    setCargando(true);
    try {
      const { data, error } = await supabaseConexion.auth.signUp({ email: correo, password: contrasegna, options: { data: { display_name: nombre } } });
      if (error) throw error;
      //Si tiene éxito, no crea la cuenta sino que manda un correo al usuario para terminar de crearla, la función no hace nada más.
      if (data) establecerError("ATENCIÓN: Comprueba tu correo electrónico y confírmalo para crear la cuenta (si no te llega, puede que la dirección de correo ya esté en uso o esté en la bandeja de spam)");
    } catch (e) {
      //Lamentablemente, el SDK no ofrece opciones para saber si el correo ya está en uso antes de hacer la cuenta (al menos no sin intentar hacer login antes), en caso de crear una cuenta con una dirección repetida no da ningún error, simplemente el correo de confirmación nunca llega.
      establecerError("Ha habido un error al intentar crear la cuenta, el correo ya está en uso o el servidor está fallando, prueba con otros campos o intentalo más tarde");
    } finally {
      setCargando(false);
    }
  }

  //Intenta iniciar sesión dados un correo y una contraseña, si tiene éxito establece la sesión y redirige, si no da error.
  const iniciarSesion = async (correo, contrasegna) => {
    setErrorSupabase("");
    setCargando(false);
    try {
      const { data, error } = await supabaseConexion.auth.signInWithPassword({
        email: correo, password: contrasegna,
        options: {
          emailRedirectTo: URL_APP + "/gestor",
        }
      });
      if (error) throw error;
      if (data) {
        setSesionIniciada(true);
        navegar("/gestor"); //Si todo va bien, reenvia a gestor.
      }
    } catch (e) {
      establecerError("Las credenciales no son correctas o ha habido un error");
    } finally {
      setCargando(false);
    }
  };

  //Cierra la sesión y limpia el localStorage para que sea como si se entrase por primera vez.
  const cerrarSesion = async () => {
    setCargando(true);
    setErrorSupabase("");
    try {
      await supabaseConexion.auth.signOut();
      await localStorage.clear(); //Se borra el localStorage porque es aquí donde se guarda el token de sesión de Supabase.
      setSesionIniciada(false);
      navegar("/"); //Si todo va bien redirige al inicio.
    } catch (error) {
      establecerError(error.message);
    } finally {
      setCargando(false);
    }
  }

  //Recoje los datos del usuario a partir de la sesión activa.
  const obtenerUsuario = async () => {
    setCargando(true);
    setErrorSupabase("");
    try {
      const { data, error } = await supabaseConexion.auth.getUser();
      if (error) throw error;
      setUsuarioSesion(data);
    } catch (error) {
      establecerError(error.message);
    } finally {
      setCargando(false);
    }
  };

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
    crearCuenta, iniciarSesion, cerrarSesion, usuarioSesion, sesionIniciada, cargando, errorSupabase, supabaseConexion
  }

  return (
    <>
      <ContextoSesion.Provider value={datosProveer}>
        {props.children}
      </ContextoSesion.Provider>
    </>
  );
};

export default ProveedorSesion;
export { ContextoSesion };