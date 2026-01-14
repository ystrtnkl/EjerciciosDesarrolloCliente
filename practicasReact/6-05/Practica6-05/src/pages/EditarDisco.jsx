import React from 'react';
import { useParams } from 'react-router-dom';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';
import { validarDiscoSoft } from '../libraries/validaciones.js';
import { useNavigate } from 'react-router-dom';
import useDiscos from '../hooks/useDiscos.js';
import { getError } from '../libraries/traducir.js';
import Cargando from '../components/Principal/Cargando.jsx';

//Página donde se edita un disco.
function EditarDisco() {

    const { uuid } = useParams(); //Dicho disco se especifica mediante la URL.
    const navegar = useNavigate();
    const { editarDiscoParcial, discosCargados, cargando, error } = useDiscos(); //Usa el hook intermedio para el contexto de discos para apropiarse de los estados.
    //Hacen falta los datos del disco original (para los placeholders y para saber si existe).
    const discoOriginal = discosCargados.filter((e) => { return e.id === uuid }); //Se necesita saber como era el disco originalmente para renderizar correctamente el formulario.

    return (
        <>
            {cargando ? (<Cargando />) : (error ? (<p>{getError("es", "errorDiscoEditar")}</p>) : (<div>
                {discoOriginal[0] ? (<FormularioInsercionDisco previo={discoOriginal[0]} editando={true} guardar={(disco) => {
                    editarDiscoParcial(uuid, disco);
                    navegar("/listarDisco/" + uuid);
                }} validador={(disco) => { return validarDiscoSoft(disco, true); }} />)
                    : (<p>{getError("es", "errorDiscoEditar")}</p>)}
            </div>))}
        </>
    )
}

export default EditarDisco;