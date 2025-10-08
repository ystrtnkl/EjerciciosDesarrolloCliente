import React, {useState} from 'react';
import './Matricula.css';
import Discente from '../Discente/Discente.jsx';
import original from '../../assets/matriculados.json'; //Los datos de los discentes se obtienen mediante el json que hay en la carpeta assets.

//Este componente muestra la lista de discentes, así como distintas opciones para estos.
const Matricula = () => {

    //Estado para manipular la lista de discentes (por defecto el valor en el json)
    const [discentes, setDiscentes] = useState([...original.discentes]);
    //Estado para saber si se van a ordenar los apellidos de manera ascendende o descendente.
    const [ordenanzaAscendente, setOrdenanzaAscendente] = useState(false);

    //Reinicia ambos estados, por lo tanto la lista volverá a mostrarse como al principio (igual que en el json)
    const reiniciar = () => {
        setDiscentes([...original.discentes]);
        setOrdenanzaAscendente(false);
    }

    //Función llamada desde el propio discente que elimina ese mismo discente de la lista.
    const desmatricular = (id) => {
        setDiscentes(discentes.filter((e) => {
            return e.id !== id
        }));
    }

    //Función genérica para filtrar por curso, recibe los carácteres que debe contener el título del curso (puede filtrar tanto por año como por módulo)
    const filtrarCurso = (condicion) => {
        setDiscentes(discentes.filter((e) => {
            return e.curso.includes(condicion)
        }));
    }

    //Función para filtrar solo los discentes que tengan esa misma afición en su lista de aficiones.
    const filtrarAficion = (aficion) => {
        setDiscentes(discentes.filter((e) => {
            return e.aficiones.includes(aficion)
        }));
    }

    //Función para ordenar alfabeticamente por apellidos, usa el estado para saber si ordenar ascendentemetne o descendentemente.
    const ordenarApellidos = () => {
        setDiscentes(discentes.sort((a, b) => {
            return ordenanzaAscendente ? b.apellidos.localeCompare(a.apellidos) : a.apellidos.localeCompare(b.apellidos)
        }));
        setOrdenanzaAscendente(!ordenanzaAscendente);
    }

    //En el botón de filtrar los discentes con la afición de lectura, se incluye solo "lectura" y no "leer".
    return (
    <div className="panel-matriculacion">
        <button onClick={() => {filtrarCurso("2DAW")}}>Solo de 2DAW</button>
        <button onClick={() => {filtrarCurso("1")}}>Solo los del primer curso</button>
        <button onClick={() => {filtrarCurso("DAW")}}>Solo los de DAW</button>
        <button onClick={() => {filtrarAficion("lectura")}}>Solo los lectores</button>
        <button onClick={ordenarApellidos}>Ordenar lista actual por apellidos ({ordenanzaAscendente ? "z-a" : "a-z"})</button>
        <button onClick={reiniciar}>Reiniciar</button>
        <br /><br />
        {discentes.map((e) => {
            return (<Discente discente={e} desmatricular={desmatricular} key={e.id} />);
        })}
    </div>
    )
}

export default Matricula;