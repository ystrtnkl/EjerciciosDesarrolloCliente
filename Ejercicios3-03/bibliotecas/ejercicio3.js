"use strict";

//Como en el ejercicio 4 se pide que se puedan crear más de estos objetos, también está la posibilidad de crearlos desde 0 con un constructor (en caso de usarse directamente el objeto aparecen datos de ejemplo).
//Se usa function ya que es necesario el uso de this.
const discente = {
    id: 0,
    nombre: "Objeto",
    apellidos: "De Ejemplo",
    aficiones: ["Jugar", "Caminar", "Cantar"],
    notas: {
        primera: 10,
        segunda: 5.6,
        tercera: 2.9
    },
    calcularMedia: function(){
        let total = 0;
        for (let e in this.notas) {
            if (this.notas.hasOwnProperty(e)){
                total += this.notas[e];
            }
        }
        return total / 3;
    }, 
    imprimirAficiones: function(){
        console.log(`Mis aficiones son: ${this.aficiones.join(", ")}.`);
    },
    imprimirInforme: function(){
        console.log(`Mi ID es ${this.id} y mi nombre es ${this.nombre} ${this.apellidos}. Mis aficiones son: ${this.aficiones.join(", ")}. Mis notas (en orden) han sido: ${this.notas.primera}, ${this.notas.segunda} y ${this.notas.tercera}, y tengo una media de ${this.calcularMedia()}.`);
    },
    construirDiscente: function(id, nombre, apellidos, aficiones, notas){
        if (!validarDiscente(id, nombre, apellidos, aficiones, notas)) {
            console.log("No se ha podido crear un nuevo discente.");
            return undefined;
        }
        let nuevo = { ...this };
        nuevo.id = id;
        nuevo.nombre = nombre;
        nuevo.apellidos = apellidos;
        nuevo.aficiones = aficiones;
        nuevo.notas = notas;
        return nuevo;
    }
}

//Las validaciones de los datos a la hora de crear un nuevo objeto se hacen aquí.
const validarDiscente = (id, nombre, apellidos, aficiones, notas) => {
    if (id === undefined || typeof id !== "number" || id < 0) {
        console.log("ID no válido al crear el discente.");
        return false;
    }
    
    if (nombre === undefined || typeof nombre !== "string" || nombre === "") {
        console.log("Nombre no válido al crear el discente.");
        return false;
    }
    
    if (apellidos === undefined || typeof apellidos !== "string") {
        console.log("Apellidos no válidos al crear el discente.");
        return false;
    }

    if (aficiones === undefined || !Array.isArray(aficiones)){
        console.log("Aficiones no válidos al crear el discente.");
        return false;
    }
    let aficionesValidas = true;
    aficiones.map((e, i) => {
        if (e === undefined || typeof e !== "string" || e === "") {
            aficionesValidas = false;
            console.log(`La afición "${e}" en la posición ${i} no es válida.`);
        }
        return e;
    });
    if (!aficionesValidas) {
        return false;
    }

    if (notas === undefined || notas.primera === undefined || typeof notas.primera !== "number" || notas.segunda === undefined || typeof notas.segunda !== "number" || notas.tercera === undefined || typeof notas.tercera !== "number") {
        console.log("Objeto de notas no válido al crear el discente.");
        return false;
    }
    return true;
}

export { discente, validarDiscente };