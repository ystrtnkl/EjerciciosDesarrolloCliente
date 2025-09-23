"use strict"

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
            texto += `${i}: ${mostrarObjeto(e)}\n`;
        });
        texto += "]";
        return texto;
    }
    if (typeof objeto === "object") {
        let texto = "<Objeto JSON>: {\n";
        for (let e in objeto) {
            if (objeto.hasOwnProperty(e)){
                texto += `${e}: ${mostrarObjeto(objeto[e])}\n`;
            }
        }
        texto += "}";
        return texto;
    }
    if (omitirFunciones && typeof objeto !== "function") {
        return "";
    } else {
        return `<${typeof objeto}> ${objeto}`;
    }
    
}

export { mostrarObjeto };