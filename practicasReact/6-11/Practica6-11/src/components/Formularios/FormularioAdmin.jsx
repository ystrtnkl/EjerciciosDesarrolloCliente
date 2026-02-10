import React, { useState, useEffect } from 'react';
import useSesion from '../../hooks/useSesion.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import { useNavigate } from 'react-router-dom';

//Formulario para editar los permisos de un usuario.
function FormularioAdmin() {

  const { errorAutenticacion, cargandoAutenticacion, cambiarAdmin, soyAdmin, usuarioSesion, rolesCargados } = useSesion();
  const [resultado, setResultado] = useState(""); //Texto que se muestra abajo.
  const navegar = useNavigate();

  //Pulsar el botón de alternar permisos (usuario -> admin o vice versa) (de momento los admins pueden quitarle el rol a otros admins, más adelante se podría implementar un rol nuevo que sea quien haga esto).
  const enviar = async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("boton-cambiar-rol")) {
      if (!soyAdmin) {
        setResultado("No tienes permisos para realizar esta acción o los datos no son correctos");
        return false;
      }
      const exito = await cambiarAdmin({correo: e.target.id, poner: !e.target.classList.contains("rol-admin") });
      setResultado(exito ? "Permisos actualizados correctamente" : "No se han podido editar los permisos, ha habido un error");
      if (usuarioSesion?.user?.email === e.target.id) navegar("/logout"); //Si altera sus propios permisos, cierra sesión para aplicarlos en la interfaz cuando inicie sesión.
    }
  }

  useEffect(() => {
    if (!soyAdmin) navegar("/"); //Esta página solo la pueden ver los admins
  }, [])

  return (
    <>
      {/*Aquí se muestran los roles de cada usuario (y el botón para cambiarlo), si la app escala mucho sería conveniente implementar un sistema de paginación y filtrado.*/}
      {cargandoAutenticacion ? (<Cargando />) : (<div id="lista-roles" onClick={enviar}>{rolesCargados.map((e) => {
        return (<p key={e.id_rol}>{e.correo ?? ""}: <strong>{e.rol ?? "usuario"}</strong>
          <button id={e.correo} className={"boton-cambiar-rol " + (e.rol === "admin" ? "rol-admin" : "")}>Alternar</button>
        </p>);
      })}</div>)}
      {errorAutenticacion && (<CajaError texto={errorAutenticacion} />)}
      <p>{resultado}</p>
    </>
  )
}

export default FormularioAdmin;
