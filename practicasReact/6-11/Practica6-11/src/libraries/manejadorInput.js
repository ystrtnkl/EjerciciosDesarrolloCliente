//Función para los formularios para manejar el estado.
const manejadorInput = (e, setter, estado) => {
    if (e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA") {
        if (e.target.type === "checkbox") {
            setter({ ...estado, [e.target.name]: e.target.checked });
        } else {
            e.preventDefault();
            setter({ ...estado, [e.target.name]: e.target.value });
        }
    }
}

export { manejadorInput }