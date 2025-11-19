import React from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import { useParams } from 'react-router-dom';
import { getDisco } from '../libraries/persistencia.js';

//Página donde se muestra un solo disco en concreto.
function DiscoConcreto() {

    const { localizacion } = useParams(); //Dicho disco se especifica mediante la URL.

    //Genera una lista con solo ese disco (o ninguno en caso de no existir/haber sido borrado).
    return (
        <>
            <ListaDiscos getDiscosOriginales={() => { return getDisco(localizacion) ? [getDisco(localizacion)] : [] }} filtros={false} />
        </>
    )
}

export default DiscoConcreto;