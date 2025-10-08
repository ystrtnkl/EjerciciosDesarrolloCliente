import React from 'react';
import './Discente.css';

//Componente para mostrar cualquier discente.
const Discente = (props) => {

    //Recibe un objeto por parámetros que contiene todos los datos del discente.
    const discente = {...props.discente};
    
    //Se llama desde aquí a la función de desmatricular, usando su ID como parámetro para saber cual eliminar en el componente padre.
    return (
    <div className="discente">
        <h3>{discente.id}: {discente.nombre ?? "Sin nombre"} {discente.apellidos ?? "Sin apellidos"}</h3>
        <p>Curso: {discente.curso ?? "Curso desconocido"}</p>
        <p>Aficiones: {discente.aficiones.join(", ") ?? "Sin aficiones"}</p>
        <p>Comida: {discente.comida ?? "Comida desconocida"}</p>
        <button onClick={() => {props.desmatricular(discente.id)}}>Desmatricular</button>
    </div>
    )
}

export default Discente;