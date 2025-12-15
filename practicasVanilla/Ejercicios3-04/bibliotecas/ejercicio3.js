"use strict"
//Estas funciones trabajan bajo el formato de los objetos del archivo objetoEjercicio3.js.

const insertarUsuario = (usuarios, usuario) => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }
    
    if (!validarUsuario(usuario)) {
        console.log("Usuario inválido.");
        return usuarios;
    }

    return [...usuarios, usuario];
}

//Función externa para validar nuevos usuarios, devuelve true si el usuario esta correctamente formateado.
//Se validan todas las propiedades tal y como están formateadas en el archivo objetoEjercicio3.js.
const validarUsuario = (usuario) => {
    return usuario !== undefined
        && usuario !== null
        && typeof usuario === "object"
        && typeof usuario.contacto === "object"
        && typeof usuario.contacto.direccion === "object"
        && typeof usuario.preferencias === "object"
        && esStringLleno(usuario.nombre)
        && esStringLleno(usuario.contacto.correoelectronico)
        && esStringLleno(usuario.preferencias.idioma)
        && esStringLleno(usuario.contacto.direccion.calle)
        && esStringLleno(usuario.contacto.direccion.localidad)
        && esStringLleno(usuario.contacto.direccion.pais)
        && typeof usuario.contacto.telefono === "string"
        && (usuario.preferencias.tema === "claro" || usuario.preferencias.tema === "oscuro")
        && typeof usuario.preferencias.edad === "number"
        && usuario.preferencias.edad > 0
        && usuario.contacto.correoelectronico.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

//Función externa para validar si las propiedades tipo string de los usuarios son correctas (no se pedirá un formato concreto).
const esStringLleno = (texto) => {
    return texto !== undefined
        && texto !== null
        && typeof texto === "string"
        && texto.length > 0;
}

//Función externa para validar si el array de usuarios es, efectivamente un array (puede validar los elementos ya existentes).
const arrayUsuariosValido = (usuarios, comprobarUsuarios = false) => {
    const arrayValido = usuarios !== undefined && usuarios !== null && Array.isArray(usuarios);
    if (!comprobarUsuarios) {
        return arrayValido;
    } else {
        let usuariosValidos = true;
        usuarios.map((e, i) => {
            if (!validarUsuario(e)) {
                usuariosValidos = false;
            }
        });
        return usuariosValidos && arrayValido;
    }
}

//Por defecto filtra los usuarios mayores 18, pero se puede especificar la edad.
const filtrarUsuariosMayores = (usuarios, edadMinima = 18) => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].filter((e, i) => {
        if (validarUsuario(e)) {
            return typeof e.preferencias.edad === "number" && e.preferencias.edad >= edadMinima;
        }
    });
}

//Por defecto filtra los usuarios que tengan el correo de yahoo.com, pero se puede especificar otro.
const filtrarUsuariosServidorCorreo = (usuarios, correoServidor = "@yahoo.com") => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].filter((e, i) => {
        if (validarUsuario(e)) {
            return typeof e.contacto.correoelectronico === "string" && e.contacto.correoelectronico.endsWith(correoServidor);
        }
    });
}

//Por defecto filtra los usuarios que tengan el tema claro en preferencias, pero se puede especificar el oscuro.
const filtrarUsuariosTema = (usuarios, tema = "claro") => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].filter((e, i) => {
        if (validarUsuario(e)) {
            return e.preferencias.tema.toLowerCase() === tema;
        }
    });
}

//Por defecto filtra a los usuarios españoles, pero se puede especificar otro país.
const filtrarUsuariosPais = (usuarios, pais = "españa") => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].filter((e, i) => {
        if (validarUsuario(e)) {
            return e.contacto.direccion.pais.toLowerCase() === pais;
        }
    });
}

//Devuelve todos los usuarios que sean invalidos (que no cumplan los criterios de la función validarUsuario).
const filtrarUsuariosInvalidos = (usuarios) => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].filter((e, i) => {
        return !validarUsuario(e);
    });
}

//Agrega un campo apellidos a todos los usuarios, todos tendrían los mismos apellidos.
const agnadirApellidosGenericos = (usuarios, apellidos = "No indicado") => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].map((e, i) => {
        return { ...e, apellidos };
    });
}

//Agrega un campo código a la dirección e todos los usuarios, todos tendrían el mismo código.
const agnadirCodigoGenerico = (usuarios, codigo = "00000") => {
    if (!arrayUsuariosValido(usuarios)) {
        console.log("Array original de usuarios inválido.");
        return usuarios;
    }

    return [...usuarios].map((e, i) => {
        if (validarUsuario(e)) {
            e.contacto.direccion = { ...e.contacto.direccion, codigo: codigo };
            return e;
        }
    });
}

//FUnción para cumplir los criterios del ejercicio 3 apartado 4.
const filtrarUsuariosMayoresEspagnolesClaros = (usuarios) => {
    return filtrarUsuariosPais(filtrarUsuariosMayores(filtrarUsuariosTema(usuarios)));
}

export { insertarUsuario, filtrarUsuariosMayores, filtrarUsuariosPais, filtrarUsuariosTema, filtrarUsuariosServidorCorreo, filtrarUsuariosInvalidos, agnadirApellidosGenericos, agnadirCodigoGenerico, filtrarUsuariosMayoresEspagnolesClaros };