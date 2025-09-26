"use strict"
//Este script era originalmente de otro ejercicio, pero será útil aquí también.

//Imprime recursivamente todos los datos de cualquier tipo de objeto. Si omitirFunciones es true no se imprimirá el código de las funciones
const mostrarObjeto = (objeto, omitirFunciones) => {
    if (objeto === null) {
        return "El objeto es nulo.";
    }
    
    if (objeto === undefined) {
        return "El objeto es indefinido.";
    }

    if (Array.isArray(objeto)) {
        let texto = "<Array>: [\n";
        objeto.map((e, i) => {
            texto += `${i}: ${mostrarObjeto(e, omitirFunciones)}\n`;
        });
        texto += "]";
        return texto;
    }

    if (typeof objeto === "object") {
        let texto = "<Objeto JSON>: {\n";
        for (let e in objeto) {
            if (objeto.hasOwnProperty(e)) {
                texto += `${e}: ${mostrarObjeto(objeto[e], omitirFunciones)}\n`;
            }
        }
        texto += "}";
        return texto;
    }

    if (omitirFunciones && typeof objeto === "function") {
        return "<función>";
    } else {
        return `<${typeof objeto}> ${objeto}`;
    }
}

export { mostrarObjeto };