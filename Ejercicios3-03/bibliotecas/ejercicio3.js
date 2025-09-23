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
        let e; //La variable iteradora tiene que ser declarada antes ya que el script funciona en modo strict.
        let total = 0;
        for (e in this.notas) {
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
    construirDiscente: function(id, nombre, apellidos, notas){
        if (!validarDiscente(id, nombre, apellidos, notas) === false) {
            console.log("No se ha podido crear un nuevo discente.")
            return undefined;
        }
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.notas = notas;
    }
}

//Las validaciones de los datos a la hora de crear un nuevo objeto se hacen aquí.
const validarDiscente = (id, nombre, apellidos, notas) => {
    
}

export { discente };