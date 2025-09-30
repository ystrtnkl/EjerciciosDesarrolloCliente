import React from 'react';
import './ContadorLimite.css';

//Componente para controlar la disponibilidad de los botones de la lista de números aleatorios de Listado.
const ContadorLimite = (props) => {
    //Límites inferior y superior para la lista de números en el componente Listado.
    const limiteMaximo = 10;
    const limiteMinimo = 0;

    //Recibe por props los callback de los botones y la cantidad actual de números en el estado de Listado, activa y desactiva los botones según conviene.
    return (
    <div>
        <button onClick={props.generarNuevo} disabled={props.cantidad >= limiteMaximo - 1 || props.cantidad < limiteMinimo}>Generar</button>
        <button onClick={props.eliminarTodos} disabled={props.cantidad === 0}>Eliminar</button>
    </div>
    )
}

export default ContadorLimite;