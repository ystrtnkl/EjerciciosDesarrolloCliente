import React, { useState } from 'react';
import './ListaDiscos.css';
import Disco from './Disco.jsx';

const ListaDiscos = (props) => {

    const [discos, setDiscos] = useState(props.discos);

  return (
    <div>
      <div>botones</div>
      <div className="lista">
        {discos.map((e, i) => {
            return (<Disco key={i} disco={e}/>)
        })}
      </div>
    </div>
  )
}

export default ListaDiscos;