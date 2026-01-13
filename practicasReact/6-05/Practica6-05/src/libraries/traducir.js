import errores from '../assets/errores.json';

//Función que devuelve un error en un determinado idioma a partir del json.
//Habria estado interesante hacer lo mismo con los textos estáticos de la interfaz (ejemplo: títulos, párrafos), pero dada la complejidad de la aplicación no parece tan necesario (además que la aplicación solo está en español).
const getError = (idioma = "es", id = "error") => {
    return errores.errores[idioma][id] ?? '';
}

export { getError }