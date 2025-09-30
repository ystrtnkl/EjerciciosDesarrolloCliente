import React, {useState} from 'react';
import './ContadorLikes.css';

//Componente que cuenta likes y dislikes.
const ContadorLikes = () => {
    //Ambos valores controlados por estados diferentes.
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    //Callbacks para controlar los likes y dislikes.
    const aumentarLikes = () => {
        const nuevosLikes = likes + 1;
        setLikes(nuevosLikes);
    }
    const aumentarDislikes = () => {
        const nuevosDislikes = dislikes + 1;
        setDislikes(nuevosDislikes);
    }
    const reiniciarContadores = () => {
        setLikes(0);
        setDislikes(0);
    }

    //Este componente además muestra la popularidad total, demostrando como se pueden juntar ambos estados independientes.
    return (
    <div>
        <p>Popularidad: {likes - dislikes}</p>
        <p>Likes: {likes} <button onClick={aumentarLikes}>Me gusta</button> </p>
        <p>Dislikes: {dislikes} <button onClick={aumentarDislikes}>No me gusta</button> </p>
        <button onClick={reiniciarContadores}>Reiniciar</button>
    </div>
    )
}

export default ContadorLikes;