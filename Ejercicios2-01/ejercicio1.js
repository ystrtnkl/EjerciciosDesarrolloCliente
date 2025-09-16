"use strict"

const calcularIMC = (masa, altura) => {
    //Tanto masa como altura deben ser números mayores que 0.
    if (!isNaN(masa) && !isNaN(altura) && masa > 0 && altura > 0) {
        return masa / (altura * altura);
    } else {
        return undefined;
    }
    
}

export { calcularIMC };