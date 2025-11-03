//Baraja un array, cambiando aleatoriamente la posición de sus elementos.
const barajar = (array) => {
    if (Array.isArray(array) && array.length > 0) {
        const nuevoArray = [...array];
        //Utilizando el algoritmo de fisher yates shuffle.
        let indice = nuevoArray.length;
        while (indice > 0) {
            const aleatorio = Math.floor(Math.random() * indice);
            indice--;
            [nuevoArray[indice], nuevoArray[aleatorio]] = [nuevoArray[aleatorio], nuevoArray[indice]];
        }
        return nuevoArray;
    } else {
        return array;
    }
}

export { barajar }