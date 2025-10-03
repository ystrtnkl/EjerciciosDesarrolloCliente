"use strict"

//Valida que tablero es un array de arrays, y cada uno de estos arrays mide lo mismo. Y si validarTableros es true valida que los números que sean 0 o -1.

const validarTablero = (tablero, validarTableroBase = false) => {
    if (!tablero || !Array.isArray(tablero) || tablero.length === 0) {
        console.log("La base del tablero no es válida.");
        return false;
    }
    let longitud = 0;
    for (let x = 0; x < tablero.length; x++) {
        if (!tablero[x] || !Array.isArray(tablero[x]) || tablero[x].length === 0) {
            console.log("Una de las filas del tablero no es válida.");
            return false;
        }
        if (x == 0) {
            longitud = tablero[x].length;
        } else if (longitud !== tablero[x].length) {
            console.log("Una de las filas del tablero no es válida.");
            return false;
        }
        if (validarTableroBase) {
            for (let y = 0; y < tablero[x].length; y++) {
                if (tablero[x][y] !== 0 && tablero[x][y] !== -1) {
                    console.log("Una de las casillas del tablero no es válida.");
                    return false;
                }
            }
        }

    }
    return true;
}

//Devuelve una matriz agregando los números al matriz original del juego.
const identificarMinas = (tablero) => {
    if (!validarTablero(tablero, true)) {
        return tablero;
    }
    const resultado = [...tablero];
    for (let x = 0; x < resultado.length; x++) {
        for (let y = 0; y < resultado[x].length; y++) {
            if (resultado[x][y] === 0) {
                let cantidad = 0;
                if (x !== 0) { //Evaluar izquierda.
                    cantidad += resultado[x - 1][y] === -1 ? 1 : 0;
                }
                if (x !== resultado.length - 1) { //Evaluar derecha.
                    cantidad += resultado[x + 1][y] === -1 ? 1 : 0;
                }
                if (y !== 0) { //Evaluar arriba.
                    cantidad += resultado[x][y - 1] === -1 ? 1 : 0;
                }
                if (y !== resultado[x].length - 1) { //Evaluar abajo.
                    cantidad += resultado[x][y + 1] === -1 ? 1 : 0;
                }
                if (x !== 0 && y !== 0) { //Evaluar arriba izquierda.
                    cantidad += resultado[x - 1][y - 1] === -1 ? 1 : 0;
                }
                if (x !== 0 && y !== resultado[x].length - 1) { //Evaluar abajo izquierda.
                    cantidad += resultado[x - 1][y + 1] === -1 ? 1 : 0;
                }
                if (x !== resultado.length - 1 && y !== 0) { //Evaluar arriba derecha.
                    cantidad += resultado[x + 1][y - 1] === -1 ? 1 : 0;
                }
                if (x !== resultado.length - 1 && y !== resultado[x].length - 1) { //Evaluar abajo derecha.
                    cantidad += resultado[x + 1][y + 1] === -1 ? 1 : 0;
                }
                resultado[x][y] = cantidad;
            }
        }
    }
    return resultado;
}

//Devuelve como texto los valores que haya en el tablero, opcionalmente formateados para el juego.
const imprimirTablero = (tablero, formatear = true) => {
    if (!validarTablero(tablero)) {
        return "";
    }
    let texto = "";
    for (let x = 0; x < tablero.length; x++) {
        for (let y = 0; y < tablero[x].length; y++) {
            texto = `${texto} ${tablero[x][y]}`;
        }
        texto += "\n";
    }
    return formatear ? texto.replaceAll("-1", "#").replaceAll("0", "·") : texto;
}

//Genera un tablero aleatorio con un tamaño definido, y cuanto mayor dificultad más minas aparecerán.
const generarTableroAleatorio = (tamagnoX = 8, tamagnoY = 8, dificultad = 0.2) => {
    if (typeof tamagnoX !== "number" || typeof tamagnoY !== "number" || tamagnoX < 1 || tamagnoY < 1 || typeof dificultad !== "number" || dificultad > 1 || dificultad < 0) {
        console.log("Parámetros inválidos.");
        return [];
    }
    const resultado = Array(tamagnoX);
    for (let x = 0; x < resultado.length; x++) {
        resultado[x] = Array(tamagnoY);
        for (let y = 0; y < resultado[x].length; y++) {
            resultado[x][y] = Math.random() < dificultad ? -1 : 0;
        }
    }
    return resultado;
}

export { identificarMinas, imprimirTablero, generarTableroAleatorio };