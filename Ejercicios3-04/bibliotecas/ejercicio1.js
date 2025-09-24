"use strict"

//El código del ejercicio está en esta función para no ponerlo directamente en main.js.
const ejercicio1 = () => {
    let nombres = ["Teinkiel", "Alerak", "Tetra", "Multer", "Heikko"];

    nombres.map((e, i) => {
        console.log(`${e} en mayúsculas es ${e.toUpperCase()}.`);
    });

    [...nombres].sort().reverse().map((e, i) => { //De esta manera el array original no cambia.
        console.log(`Nombre en la posición ${i} = ${e}.`);
    });

    let objetos = [];
    nombres.map((e, i) => {
        objetos = [...objetos, { id: i, nombre: e }];
    });
    objetos.map((e, i) => {
        console.log(`El ID ${e.id} tiene de nombre ${e.nombre}.`);
    });
}

export { ejercicio1 };