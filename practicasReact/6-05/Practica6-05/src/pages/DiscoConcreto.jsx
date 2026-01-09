import React, { useContext } from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import { useParams } from 'react-router-dom';
import { ContextoDiscos } from '../contexts/ProveedorDiscos.jsx';

//Página donde se muestra un solo disco en concreto.
function DiscoConcreto() {

    const { uuid } = useParams(); //Dicho disco se especifica mediante la URL.
    const { getDisco } = useContext(ContextoDiscos);
    const recibirDisco = async () => {
        return await [await getDisco(uuid)];
    }

    //Genera una lista con solo ese disco (o ninguno en caso de no existir/haber sido borrado).
    return (
        <>
            <ListaDiscos getDiscosOriginales={recibirDisco} filtros={false} />
        </>
    )
}

export default DiscoConcreto;