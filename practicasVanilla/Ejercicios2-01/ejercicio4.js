"use strict";

//Aplica un impuesto (en formato porcentaje) a un precio
const calcularImpuestos = (producto = "Producto genérico", precio = 100, impuesto = 21) => {
    if (isNaN(precio)) {
        console.log("El precio debe ser un número válido");
        return undefined;
    }
    if (isNaN(impuesto)) {
        console.log("El porcentaje de impuestos debe ser un número válido");
        return undefined;
    }
    let precioFinal = precio + (precio * impuesto / 100);
    console.log(`El producto ${producto} vale ${precio}€, si se le aplica el impuesto del ${impuesto} en total vale ${precioFinal}€.`);
}

export { calcularImpuestos };