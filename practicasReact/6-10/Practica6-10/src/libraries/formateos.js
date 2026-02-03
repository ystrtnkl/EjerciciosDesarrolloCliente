//Formatea a un precio español.
const floatAPrecio = (numero) => {
    if (isNaN(numero)) return "0,00€";
    return numero?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) ?? "0,00€";
}

//Formatea un timestamp a una fecha española.
const timestampAFecha = (timestamp) => {
    timestamp = parseInt(timestamp);
    if (isNaN(timestamp)) return "???";
    const fecha = new Date(timestamp);
    return fecha?.toLocaleDateString('es-ES', {year: 'numeric',month: 'long',day: 'numeric'});
}

//Es en este archivo en el que estaría interesante implementar el manejo de distintos idiomas.

export { floatAPrecio, timestampAFecha }
