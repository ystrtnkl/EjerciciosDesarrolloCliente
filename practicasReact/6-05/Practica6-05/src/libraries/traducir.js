import errores from '../assets/errores.json';

//Función que devuelve un error en un determinado idioma a partir del json.
//Habria estado interesante hacer lo mismo con los textos estáticos de la interfaz (ejemplo: títulos, párrafos), pero dada la complejidad de la aplicación no parece tan necesario (además que la aplicación solo está en español).
//Otra funcionalidad que habría estado interesante (pero por la magnitud del proyecto no fué necesaria) sería la de usar un hook o un contexto para guardar el idioma actual, y que se llame a esta función en base del idioma escogido.
const getError = (idioma = "es", id = "error") => {
    return errores.errores[idioma][id] ?? '';
}

export { getError }