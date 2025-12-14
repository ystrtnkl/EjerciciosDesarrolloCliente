//Archivo centralizado con algunos formateos de datos.

//Sirve para sacar el id de una url (ya que la API no devuelve el "id" de los objetos).
const idPorUrl = (url) => {
    return url.replace(/\//g, "").match(/(\d+)$/)[0] ?? "";
}

//"Traduce" el género de un personaje.
const formatearGeneroEspagnol = (genero) => {
    return { male: "Hombre", female: "Mujer", "n/a": "Otro" }[genero ?? "n/a"] ?? "Deconocido";
}

//Arregla el resumen de una pelicula para una correcta visualización.
const formatearResumen = (resumen) => {
    if (typeof resumen === "string") {
        return resumen.replaceAll("\\r\\n", "<br>");
    } else {
        return resumen;
    }
}

//Formatea el dato de longitud a un formato en español.
const unidadesMedida = { //Diccionario de unidades de medida admitidas.
    "meter": " m",
    "kilometer": " km",
    "centimeter": " cm",
    "kilo": " k",
    "kilogram": " kg",
}
const formatearMedida = (longitud, unidad = "meter") => { //Se pide que unidad sea un valor como meter, centimeter, kilometer, kilogram...
    if (typeof longitud === "string") {
        return longitud.replaceAll(".", ",") + (unidadesMedida[unidad] ?? "");
    } else if (!isNaN(longitud)) {
        return longitud.toLocaleString("es-ES", { style: "unit", unit: unidad, unitDisplay: "narrow" });
    } else {
        return longitud;
    }
}

//Algunas unidades de medida de tiempo están en inglés, esta función las traduce al español.
const diccionario = { //Diccionario con todas las traducciones.
    "month": "mes",
    "months": "meses",
    "year": "año",
    "years": "años",
    "day": "día",
    "days": "días",
    "week": "semana",
    "weeks": "semanas",
    "hour": "hora",
    "hours": "horas",
    "minute": "minuto",
    "minutes": "minutos",
    "second": "segundo",
    "seconds": "segundos",
    "unknown": "desconocido"
}
const traducirTiempo = (tiempo) => {
    if (typeof tiempo === "string") {
        let resultado = tiempo;
        for (let ingles in diccionario) {
            if (Object.hasOwn(diccionario, ingles)) {
                resultado = resultado.replaceAll(ingles, diccionario[ingles]);
            }
        }
        return resultado;
    } else {
        return tiempo;
    }
}

export { idPorUrl, formatearGeneroEspagnol, formatearResumen, formatearMedida, traducirTiempo }