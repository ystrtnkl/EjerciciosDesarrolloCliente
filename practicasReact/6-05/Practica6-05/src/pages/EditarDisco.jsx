import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContextoDiscos } from '../contexts/ProveedorDiscos.jsx';
import imgCargando from '../assets/cargando.gif';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';
import { validarDiscoSoft } from '../libraries/validaciones.js';
import { useNavigate } from 'react-router-dom';

//Página donde se edita un disco.
function EditarDisco() {

    const { uuid } = useParams(); //Dicho disco se especifica mediante la URL.
    const navegar = useNavigate();
    const { getDisco, editarDiscoParcial } = useContext(ContextoDiscos);
    const [cargando, setCargando] = useState(true);
    //Hacen falta los datos del disco original (para los placeholders y para saber si existe).
    const [discoOriginal, setDiscoOriginal] = useState(null);
    const buscarDiscoOriginal = async () => {
        const discoAEditar = await await getDisco(uuid);
        if (discoAEditar) {
            setDiscoOriginal(discoAEditar);
            setCargando(false);
        }
    }
    useEffect(() => {
        buscarDiscoOriginal();
    }, []);

    //(cargando > (fallo O formulario))
    return (
        <>
            {cargando ? (<img src={imgCargando} alt="Cargando..." />) :
                (<div>
                    {discoOriginal ? (<FormularioInsercionDisco previo={discoOriginal} editando={true} guardar={(disco) => {
                        editarDiscoParcial(uuid, disco);
                        navegar("/listarDisco/" + uuid);
                    }} validador={validarDiscoSoft} />)
                        : (<p>El disco a editar no existe</p>)}
                </div>)}
        </>
    )
}

export default EditarDisco;