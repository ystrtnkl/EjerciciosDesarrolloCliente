import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Nave from '../components/Transportes/Nave.jsx';
import cargando from '../assets/cargando.gif';

function NaveConcreto() {

  const [fallo, setFallo] = useState(false);
  const { id } = useParams();
  const [nave, setNave] = useState({});

  const recibirDatos = async () => {
    try {
      const navesTraidos = await traerDatos("starships/" + id, false);
      setNave(navesTraidos);
    } catch (error) {
      setFallo(error);
    }
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      {nave.name
        ? (<Nave nave={nave} expandir={true} /> )
        : (fallo || nave.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p> /*Si hay algún error lo notifica al usuario.*/)
          : (<img className="cargando" src={cargando} alt="Cargando..." /> /*Mientras que el estado siga vacío mostrará un gif de carga.*/)
        )}
    </>
  )
}

export default NaveConcreto;
