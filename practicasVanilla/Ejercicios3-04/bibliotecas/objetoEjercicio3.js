"use strict"
//Se cambió este script para que exporte el array de usuarios y así pueda ser usado en otros scripts.
const usuarios = [
  {
    nombre: "Hacker", //Usuario que no cumple los criterios, sirve de ejemplo para la función filtrarUsuariosInvalidos del ejercicio 3
    correoelectronico: "123"
  },
  {
    nombre: "Ejemplo", //Usuario de ejemplo para devolver en el ejercicio 3 apartado 4.
    preferencias: { tema: "claro", idioma: "español", edad: 25 },
    contacto: {
      direccion: {
        calle: "Calle falsa, 666",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "correofalso@yahoo.com",
      telefono: "123456789",
    },
  },
  {
    nombre: "Luis",
    preferencias: { tema: "oscuro", idioma: "español", edad: 25 },
    contacto: {
      direccion: {
        calle: "Calle falsa, 666",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "correofalso@yahoo.com",
      telefono: "123456789",
    },
  },
  {
    nombre: "Marta",
    preferencias: { tema: "claro", idioma: "catalán", edad: 15 },
    contacto: {
      direccion: {
        calle: "Calle también falsa, 123",
        localidad: "Andorra la Vella",
        pais: "Andorra",
      },
      correoelectronico: "correoandorrano@gmail.com",
      telefono: "",
    },
  },
  {
    nombre: "Alberto",
    preferencias: { tema: "oscuro", idioma: "español", edad: 56 },
    contacto: {
      direccion: {
        calle: "Elm Street, 666",
        localidad: "Petrer",
        pais: "España",
      },
      correoelectronico: "correonulo@yahoo.com",
      telefono: "548632478",
    },
  },
  {
    nombre: "Jacinto",
    preferencias: { tema: "claro", idioma: "inglés", edad: 17 },
    contacto: {
      direccion: {
        calle: "Elm Street, 667",
        localidad: "Elda",
        pais: "España",
      },
      correoelectronico: "correofalso@gmail.com",
      telefono: "",
    },
  },
  {
    nombre: "Rigoberta",
    preferencias: { tema: "claro", idioma: "francés", edad: 34 },
    contacto: {
      direccion: {
        calle: "Calle inexistente, 6",
        localidad: "Burdeos",
        pais: "Francia",
      },
      correoelectronico: "correofalso@gmail.com",
      telefono: "232547859",
    },
  },
  {
    nombre: "Sandra",
    preferencias: { tema: "oscuro", idioma: "español", edad: 18 },
    contacto: {
      direccion: {
        calle: "Calle de mentira, s/n",
        localidad: "Petrer",
        pais: "España",
      },
      correoelectronico: "estecorreonoexiste@gmail.com",
      telefono: "452158697",
    },
  },
  {
    nombre: "Sandra",
    preferencias: { tema: "oscuro", idioma: "español", edad: 18 },
    contacto: {
      direccion: {
        calle: "Calle existente, 34",
        localidad: "Petrer",
        pais: "España",
      },
      correoelectronico: "correoinexistente@yahoo.com",
      telefono: "",
    },
  },
];

export { usuarios };