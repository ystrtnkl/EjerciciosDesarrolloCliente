//Valida un correo.
const validarCorreo = (correo) => {
    return typeof correo === "string" && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);
}

//Valida una contrasegna, debe tener entre 8 y 32 caracteres y contener una letra mayuscula y minuscula, un numero y un simbolo.
const validarContrasegna = (contrasegna) => {
    return typeof contrasegna === "string" && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}$$:;<>,.?~\\/-]).{8,32}$/.test(contrasegna);
}

//Valida un nombre de usuario, de 4 a 20 caracteres.
const validarNombreUsuario = (nombre) => {
    return typeof nombre === "string" && nombre.length >= 4 && nombre.length < 20;
}





export { validarContrasegna, validarCorreo, validarNombreUsuario }