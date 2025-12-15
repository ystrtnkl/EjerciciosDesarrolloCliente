"use strict";

//Base indica el número inicial, cantidad indica cuantas veces se multiplicará por 2
const iterarIncremental = (cantidad, base) => {
    //Como se van a hacer cálculos, se requiere que sean números
    if (!isNaN(base) && !isNaN(cantidad)) {
        let actual = base;
        let resultado = "";
        for (let i = 0; i < cantidad; i++) {
            resultado = `${resultado} ${actual}`;
            actual *= 2;
        }
        console.log(resultado);
    } else {
        return undefined;
    }
}

export { iterarIncremental };