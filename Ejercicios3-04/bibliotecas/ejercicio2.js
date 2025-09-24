"use strict"

//El código del ejercicio está en esta función para no ponerlo directamente en main.js.
const ejercicio2 = () => {
    let numeros1 = Array(10).fill(undefined).map((e, i) => {
        return generarNumeroAleatorio(1, 10);
    });
    let numeros2 = Array(10).fill(undefined).map((e, i) => {
        return generarNumeroAleatorio(1, 10);
    });
    let numeros3 = Array(10).fill(undefined).map((e, i) => {
        return generarNumeroAleatorio(1, 10);
    });

    let filtrado = [...numeros1, ...numeros2, ...numeros3].filter((e, i) => {
        return e > 5;
    });

    filtrado.map((e, i) => {
        console.log(`Elemento en la posición ${i} = ${e}.`);
    });
}

//Este generador aleatorio solo funciona con enteros.
const generarNumeroAleatorio = (minimo, maximo) => {
    return Math.floor((minimo + 1) + Math.random() * maximo);
}

export { ejercicio2 };