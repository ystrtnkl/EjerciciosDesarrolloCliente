//Función que devuelve una tabla de x por y de forma dinámica.
const generarTabla = (x, y) => {
    let celdas = "<table>";
    if (typeof x === "number" && x > 0 && typeof y === "number" & y > 0) {
        for (let i = 0; i < x; i++) {
            celdas += "<tr>";
            for (let ii = 0; ii < y; ii++) {
                celdas += "<td>";
            }
            celdas += "</tr>";
        }
    }
    return celdas + "</table>";
}

//Evalua si un color hexadecimal es claro o oscuro, devuelve true para oscuro y false para claro.
const colorEsOscuro = (color) => {
    if (typeof color !== "string") return true;
    const canales = color.replace('#', '');
    if (!isNaN(canales) || canales.length !== 6) return true;
    //Fórmula para saber la luminiscencia de un color
    const r = parseInt(canales[0] + canales[1], 16);
    const g = parseInt(canales[2] + canales[3], 16);
    const b = parseInt(canales[4] + canales[5], 16);
    const luminiscencia = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminiscencia < 128;
}

export { generarTabla, colorEsOscuro }