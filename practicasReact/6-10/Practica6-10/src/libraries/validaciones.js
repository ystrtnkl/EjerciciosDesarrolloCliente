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

//Valida un nombre de lista, de 4 a 20 caracteres.
const validarNombreLista = (nombre) => {
    return typeof nombre === "string" && nombre.length >= 4 && nombre.length < 20;
}

//Valida un UUID.
const validarUuid = (uuid) => {
    return typeof uuid === "string" && uuid.length === 36;
}

//Valida el nombre de un producto, que debe tener menos de 128 carácteres y al menos 4.
const validarNombreProducto = (nombre) => {
    return typeof nombre === "string" && nombre.length < 128 && nombre.length >= 4;
}

//Valida el peso de un producto, que tiene que ser un número positivo.
const validarPesoProducto = (peso) => {
    peso = parseFloat(peso);
    return typeof peso === "number" && !isNaN(peso) && peso >= 0;
}

//Valida el precio de un producto, que tiene que ser un número positivo.
const validarPrecioProducto = (precio) => {
    precio = parseFloat(precio);
    return typeof precio === "number" && !isNaN(precio) && precio >= 0;
}

//Valida una URL, por ejemplo la de la foto de un producto. Es permisivo, se pide que simplemente empieze por un protocolo válido y sea hasta 127 carácteres.
const validarUrl = (url) => {
    return typeof url === "string" && (url.startsWith("http://") || url.startsWith("https://")) && url.length < 128;
}

//Valida la descripción de un producto, que debe tener menos de 512 carácteres.
const validarDescripcionProducto = (descripcion) => {
    return typeof descripcion === "string" && descripcion.length < 512;
}

//Valida la descripción de una lista, que debe tener menos de 512 carácteres.
const validarDescripcionLista = (descripcion) => {
    return typeof descripcion === "string" && descripcion.length < 512;
}

//Valida los datos de un producto (solo los que se usan para insertar, no el dueño ni el uuid).
const validarDatosProducto = (producto) => {
    return typeof producto === "object"
        && validarNombreProducto(producto.nombre)
        && validarPesoProducto(producto.peso)
        && validarPrecioProducto(producto.precio)
        && validarUrl(producto.url_imagen)
        && validarDescripcionProducto(producto.descripcion);
}

//Valida un dueño, que sería un uuid de un usuario que haya creado algo. Si es permisivo permite que sea "".
//Estaría bien también comprobar si dicho uuid existe en la tabla de usuarios, pero como esta tabla funciona distinto en Supabase aparentemente no se puede.
const validarDuegno = (duegno, permisivo = true) => {
    if (permisivo) return validarUuid(duegno) || duegno === "";
    return validarUuid(duegno);
}

//Valida los datos de una lista.
const validarDatosLista = (lista) => {
    return typeof lista === "object"
        && validarNombreLista(lista.nombre)
        && validarDescripcionLista(lista.descripcion)
        && Array.isArray(lista.productos);
}

export { validarContrasegna, validarDatosLista, validarDescripcionLista, validarNombreLista, validarCorreo, validarNombreUsuario, validarUuid, validarDescripcionProducto, validarNombreProducto, validarPesoProducto, validarPrecioProducto, validarUrl, validarDatosProducto, validarDuegno }