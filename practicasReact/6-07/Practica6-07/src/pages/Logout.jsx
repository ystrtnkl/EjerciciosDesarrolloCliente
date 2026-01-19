import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSesion from '../hooks/useSesion.js';

function Logout() {

  const { cerrarSesion } = useSesion();
  const navegar = useNavigate();
  useEffect(() => {



    navegar("/");
  }, []);

  return (
    <>
    </>
  )
}

export default Logout;
