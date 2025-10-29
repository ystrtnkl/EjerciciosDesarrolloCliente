const funcionalidadPestagnas = (pestagnas, contenidos) => {
    if (pestagnas instanceof HTMLCollection && contenidos instanceof HTMLCollection && pestagnas.length === contenidos.length) {
        for (let i = 0; i <= pestagnas.length - 1; i++) {
            //Cuando se hace click en una pestaña, el contenido con el mismo indice será el único que no tenga la clase oculto.
            pestagnas[i].addEventListener("click", () => {
                for (let ii = 0; ii <= pestagnas.length - 1; ii++) {
                    contenidos[ii].classList.add("oculto");
                }
                contenidos[i].classList.remove("oculto");
            });
        }
    }
}

export { funcionalidadPestagnas }