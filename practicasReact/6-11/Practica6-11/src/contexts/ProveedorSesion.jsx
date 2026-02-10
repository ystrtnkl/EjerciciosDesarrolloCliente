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
  const { cargandoAutenticacion, errorAutenticacion, crearCuentaSupabase, iniciarSesionSupabase, cerrarSesionSupabase, obtenerUsuarioSupabase, getAdmin, setAdmin, getPerfil, setPerfil, listarRoles } = useAutenticacionSupabase();
  const [datosPerfil, setDatosPerfil] = useState({}); //Datos del perfil del usuario.
  const [soyAdmin, setSoyAdmin] = useState(false); //Si el usuario es admin o no.
  const [rolesCargados, setRolesCargados] = useState([]); //Lista de los roles cargados (para admins).

  //Las siguientes funciones hacen uso de las de useAutenticacionSupabase pero además estableciendo los estados propios del contexto.

  //Inicia sesión con un correo y una contraseña.
  const iniciarSesion = async (correo, contrasegna) => {
    const resultado = await iniciarSesionSupabase(correo, contrasegna);
    if (typeof resultado !== "undefined") {
      setUsuarioSesion(resultado);
      setSesionIniciada(true);


      setDatosPerfil(await getPerfil(resultado?.user?.id));
      setSoyAdmin(await getAdmin(resultado?.user?.id)); //En la interfaz, solo se aplican los cambios de permisos cuando se inicia sesión, pero la base de datos está protegida siempre.


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
      setDatosPerfil({});
      setSoyAdmin(false);
      navegar("/");
    }
  }

  const obtenerUsuario = async () => {
    const resultado = await obtenerUsuarioSupabase();
    if (typeof resultado !== "undefined") setUsuarioSesion(resultado);
  }

  //Cambia el perfil del usuario actual.
  const cambiarPerfil = async (datos) => {
    if (!sesionIniciada) return false;
    const resultado = await setPerfil(datos);
    if (resultado) {
      setDatosPerfil(datos);
      return true;
    };
  }

  //Convierte a admin a un usuario a partir de su correo, solo disponible para admins.
  const cambiarAdmin = async (datos) => {
    if (!sesionIniciada || !soyAdmin) return false;
    const resultado = await setAdmin(datos?.correo, datos?.poner);
    if (resultado) {
      const rolCambiar = rolesCargados.filter((e) => {return e.correo === datos.correo})[0];
      rolCambiar.rol = datos.poner ? "admin" : "usuario";
      setRolesCargados([...rolesCargados.filter((e) => {return e.correo !== datos.correo}), rolCambiar]);
      return true;
    }
    return false;
  }

  //Descarga la lista de roles de la base de datos (solo para admins) (también funciona para establecer el estado de soyAdmin si se recarga la página).
  const cargarRoles = async () => {
    const soyAdminAhora = typeof usuarioSesion.user !== "object" ? false : await getAdmin(usuarioSesion?.user?.id);
    if (soyAdminAhora) {
      setRolesCargados(await listarRoles());
    } else {
      setRolesCargados([]);
    }
    setSoyAdmin(soyAdminAhora);
  }
  useEffect(() => {
    cargarRoles();
  }, [usuarioSesion]);

  useEffect(() => {
    //Listener para manejar los cambios de sesión, así como redirigir correctamente cuando se use el enlace en el correo de confirmación del email.
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          if (ubicacion.pathname === "/login" || ubicacion.pathname === "/registrarse" || ubicacion.pathname === "/miPerfil" || ubicacion.pathname === "/gestorRoles") navegar("/gestor"); //Redirige a gestor cuando una sesión ya esté establecida, no intentarías hacer login o registrarte teniendo ya la sesión iniciada.
          setSesionIniciada(true);
          obtenerUsuario();
        } else {
          navegar("/login");
          setSesionIniciada(false);
        }
      }
    );
    cargarRoles();
  }, []);

  const datosProveer = {
    crearCuenta, iniciarSesion, cerrarSesion, usuarioSesion, sesionIniciada, cargandoAutenticacion, errorAutenticacion, supabaseConexion, datosPerfil, soyAdmin, cambiarAdmin, cambiarPerfil, rolesCargados, cargarRoles
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