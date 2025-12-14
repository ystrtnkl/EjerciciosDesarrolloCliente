"use strict";
import { ejercicio1 } from "./bibliotecas/ejercicio1.js";
import { ejercicio2 } from "./bibliotecas/ejercicio2.js";
import { usuarios } from "./bibliotecas/objetoEjercicio3.js";
import { insertarUsuario, filtrarUsuariosMayores, filtrarUsuariosPais, filtrarUsuariosTema, filtrarUsuariosServidorCorreo, filtrarUsuariosInvalidos, agnadirApellidosGenericos, agnadirCodigoGenerico, filtrarUsuariosMayoresEspagnolesClaros } from "./bibliotecas/ejercicio3.js";
import { mostrarObjeto } from "./bibliotecas/mostrarObjeto.js"; //Usando una función de otro ejercicio para el correcto formateo de datos.

//Código para el ejercicio 1:
ejercicio1();

//Código para el ejercicio 2:
ejercicio2();

//Código para el ejercicio 3 (los console.log están comentados porque no se pide mostrar nada por consola, al menos desde este script):
const usuariosOperar = [...usuarios]; //Creando una copia para no operar sobre los usuarios originales.
/*console.log(mostrarObjeto(insertarUsuario(usuariosOperar, { //Bien (mostrando array con el usuario nuevo).
    nombre: "Nuevo",
    preferencias: { tema: "oscuro", idioma: "Español", edad: 25 },
    contacto: {
      direccion: {
        calle: "Calle falsa, 144",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "emailemail@yahoo.com",
      telefono: "555",
    },
  }
)));*/
//console.log(mostrarObjeto(insertarUsuario(usuariosOperar, { nombre: "mal" }))); //Mal, por que el usuario es inválido.

//console.log(mostrarObjeto(filtrarUsuariosMayores(usuariosOperar))); //Filtrando los mayores de edad.
//console.log(mostrarObjeto(filtrarUsuariosMayores(usuariosOperar, 40))); //Filtrando los mayores de 40 años.

//console.log(mostrarObjeto(filtrarUsuariosServidorCorreo(usuariosOperar))); //Filtrando los usuarios con un correo de @yahoo.com.
//console.log(mostrarObjeto(filtrarUsuariosServidorCorreo(usuariosOperar, "@gmail.com"))); //Igual pero con @gmail.com.

//console.log(mostrarObjeto(filtrarUsuariosMayoresEspagnolesClaros(usuariosOperar))); //Filtrando los usuarios con el tema claro, mayores de edad y de España.

//console.log(mostrarObjeto(filtrarUsuariosInvalidos(usuariosOperar))); //Filtrando los usuarios con datos inválidos o inexistentes.



let usuariosOperarConApellido = agnadirApellidosGenericos(usuariosOperar); //Agregando "No indicado" como apellidos a todos los usuarios.
//console.log(mostrarObjeto(usuariosOperarConApellido));
usuariosOperarConApellido = agnadirApellidosGenericos(usuariosOperar, "Apellido Apellidez"); //Igual pero con apellidos concretos.
//console.log(mostrarObjeto(usuariosOperarConApellido));

let usuariosOperarConCodigo = agnadirCodigoGenerico(usuariosOperar); //Agregando el código "00000" a la dirección de todos los usuarios.
//console.log(mostrarObjeto(usuariosOperarConCodigo));
usuariosOperarConCodigo = agnadirCodigoGenerico(usuariosOperar, "59402"); //Igual pero con un código concreto.
//console.log(mostrarObjeto(usuariosOperarConCodigo));
