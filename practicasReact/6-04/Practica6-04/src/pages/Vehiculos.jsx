import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaVehiculos from '../components/Transportes/ListaVehiculos.jsx';

function Vehiculos() {

  const [fallo, setFallo] = useState(false);
  const [vehiculos, setVehiculos] = useState([]);

  const recibirDatos = async () => {
    try {
      const vehiculosTraidos = await traerDatos("vehicles", true);
      setVehiculos(vehiculosTraidos);
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
        : (<ListaVehiculos vehiculos={vehiculos} />)}
    </>
  )
}

export default Vehiculos;
