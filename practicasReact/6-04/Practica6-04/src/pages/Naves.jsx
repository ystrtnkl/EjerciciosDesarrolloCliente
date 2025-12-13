import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaNaves from '../components/Transportes/ListaNaves.jsx';

function Naves() {

  const [fallo, setFallo] = useState(false);
  const [naves, setNaves] = useState([]);


  const recibirDatos = async () => {
    try {
      const navesTraidas = await traerDatos("starships", true);
      setNaves(navesTraidas);
    } catch (error) {
      setFallo(error);
    }
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      <h2>Vehículos de Star Wars.</h2>
      {fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p> /*Si hay algún error, notifica al usuario.*/)
        : (<ListaNaves naves={naves} />)}


    </>
  )
}

export default Naves;
