"use strict"
window.onload = () => {
    const str = "234.323";
    const num = 325.234;
    str.toLocaleString("es-ES", { style: "unit", unit: "meter", unitDisplay: "narrow" });
    str.toLocaleString("es-ES");
    console.log(num.toLocaleString("es-ES"));

    if (typeof Storage !== "undefined") (async ()=>{
        await localStorage.getItem("a");
        await localStorage.setItem("a", "asdf");
        await sessionStorage.setItem("a", "b");
    })();
        
    const elemento = document.getElementById("a");
    document.getElementsByClassName("normal");
    document.querySelector("#normal");
    document.querySelectorAll(".normal");
    //document.getElementsBy...
    console.log(elemento.previousSibling);
    console.log(elemento.previousElementSibling);
    console.log(elemento.parentNode);
    console.log(elemento.parentElement);
    console.log(elemento.firstChild);
    console.log(elemento.lastChild);
    console.log(elemento.firstElementChild);
    console.log(elemento.lastElementChild);
    console.log(elemento.childNodes);
    console.log(elemento.children);
    console.log(elemento.innerHTML);
    console.log(elemento.innerText);
    console.log(elemento.classList);
    //console.log(elemento.classList.toggle...);
    console.log(elemento.className);
    console.log(elemento.id);
    console.log(elemento);
    elemento.insertAdjacentElement("afterbegin", "a");
    console.log(document.forms.nombre.inputnombre);

    console.log(location.href);
    console.log(location.host/*...*/);

    elemento.addEventListener("click", (e) => {
        //click, mousedown, mouseup, mouseover, mouseout, mousemove*, keydown, keyup, -input, -change, -focus, load
        console.log(e.target);
    });

    console.log(num.toString());
    console.log(parseInt(str));

    try{
        4 / 0;
    } catch (error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
        //throw new Error({fallo: true, error: error});
        throw error;
    }

    const regexLocalizacion = /^ES-\d{3}[A-Z]{2}$/;
    console.log(regexLocalizacion.test("ES-253"));

    const aaadf = new Date();
}


















fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({a: 7, str: 'Some string: &=&'})
}).then(res => res.json())
  .then(res => console.log(res));


const urlsSwapi = ["https://swapi.info/api/", "https://swapi.dev/api/", "https://swapi.py4e.com/api/"];
//Anteriormente estas funciones usaban .then(), ahora solo usan async/await.

//Hace una llamada a la API, concretamente la que responda antes, y devuelve los datos formateados.
const traerDatos = async (endpoint, multiple) => { //"endpoint" es el endpoint a partir de la url de la API, y si "multiple" es true aplicará un formateo en caso de devolver un array de objetos.
    try {
        return await Promise.any(urlsSwapi.map(async (url) => { //Se usa la API que responda exitosamente más rápido.
            try {
                let respuesta = await fetch(url + endpoint); //Por alguna razón si esta linea falla, muestra un error por la consola por mucho que se use try catch tanto dentro de la función como en sus usos.
                respuesta = await respuesta.json();
                respuesta = respuesta.results ? respuesta.results : respuesta; //Se usa el objeto en .results en caso de existir.
                if (multiple) { //Si multiple es true, aplica un id auxiliar a cada uno de los items.
                    return respuesta.map((e, i) => { return { ...e, id: i } });
                }
                return respuesta;
            } catch (error) {
                throw new Error({ fallo: true, error: error });
            }
        }));
    } catch (error) {
        throw new Error({ fallo: true, error: error }); //En caso de error, devuelve una exception con fallo en true y con los datos del error.
    }
}

//Recibe un array de endpoints y los resuelve todos con fetch. Devuelve una promesa agrupando todos ellos (todos tienen que acabar sin errores).
const traerMultiplesDatos = async (endpoints) => {
    if (!Array.isArray(endpoints) && endpoints.length > 0) {
        return { fallo: true, error: "No se proporcionó un array de endpoints" };
    }
    try {
        return Promise.all(endpoints.map(async (endpoint) => {
            try {
                let respuesta = await fetch(endpoint);
                respuesta = await respuesta.json();
                respuesta = respuesta.results ? respuesta.results : respuesta;
                return respuesta;
            } catch (error) {
                throw new Error({ fallo: true, error: error });
            }
        }));
    } catch (error) {
        throw new Error({ fallo: true, error: error });
    }
}

export { urlsSwapi, traerDatos, traerMultiplesDatos }