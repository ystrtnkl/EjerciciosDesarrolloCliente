import React, {useState} from 'react';
import './Listado.css';
import ContadorLimite from '../ContadorLimite/ContadorLimite';

//Componente dedicado a mostrar la lista de números aleatorios y los botones de control (contenidos en ContadorLimite).
const Listado = () => {

    const [numeros, setNumeros] = useState([]); //Por defecto, el estado es una lista vacía.

    //Genera un número no repetido del 1 al 100 y lo añade al array del estado, re-imprimiendo el componente.
    const generarNuevo = () => {
        setNumeros(generarAleatorioUnequivoco(numeros));
    }

    const eliminarTodos = () => {
        setNumeros([]);
    }

    //Intenta devolver el mismo array pero añadiendo un entero aleatorio no repetido, si ya están todos los números posibles devuelve el array sin cambios (el componente ContadorLimite evitaría esto).
    const generarAleatorioUnequivoco = (original, minimo = 1, maximo = 100) => {
        if (original.length >= maximo - minimo) {
            return original;
        }
        let aleatorio;
        do {
            aleatorio = Math.floor(minimo + Math.random() * maximo);
        } while (original.includes(aleatorio));
        return [...original, aleatorio];
    }

    //Los botones de generar y reiniciar están encapsulados en el componente ContadorLimite para que se activen y desactiven automáticamente.
    //Si no hay números en el estado, muestra un mensaje aclarandolo.
    return (
    <div>
        <p>Números aleatorios.</p>
        <ContadorLimite generarNuevo={generarNuevo} eliminarTodos={eliminarTodos} cantidad={numeros.length}/>
        <ul>
            {numeros.length === 0 ? (<li>No hay números</li>) : numeros.map((e, i) => {
                return (<li key={i}>Número en la posición {i}: {e}</li>)  
            })}
        </ul>
    </div>
    )
}

export default Listado;