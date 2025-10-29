"use strict";
import { funcionalidadPestagnas } from "./bibliotecas/ejercicio2.js";

const pestagnas = document.getElementsByClassName("pestagna");
const contenidos = document.getElementsByClassName("contenido");
//Esta función genera el comportamiento de pestañas, necesita dos HTMLCollection del mismo tamaño.
funcionalidadPestagnas(pestagnas, contenidos);
