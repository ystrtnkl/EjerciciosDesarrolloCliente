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
    return fecha?.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

//Formatea un número a gramos, en formato español.
const floatAGramos = (peso) => {
    if (isNaN(peso)) return false;
    return (parseFloat(peso) >= 1000 ? (parseFloat(peso) / 1000) + "Kg" : peso + "g").replaceAll(".", ",");
}

const FUERZA_SUPUESTA = 15000; //El peso en gramos máximo para no tener que recomendar llevarlo en coche.
//Devuelve un texto informativo en función si un peso a cargar es lo suficientemente pesado como para que sea recomendable llevarlo en coche (solo una recomendación).
const pesaMucho = (peso) => {
    if (isNaN(peso)) return false;
    return `${floatAGramos(peso)}, ${peso > FUERZA_SUPUESTA ? "se recomienda hacer la compra en coche" : "podrías levantarlo sin problemas"}`;
}

export { floatAPrecio, timestampAFecha, pesaMucho, floatAGramos }
