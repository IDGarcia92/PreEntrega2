// se hara cargo de lo que ocurra en main.hbs
// es el JS para el lado del CLIENTE 
console.log('mensaje del lado del cliente');

//const socket = new WebSocket('ws://localhost:5000/realTimeProducts');

const socket = io();

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const productList = {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        body: formData.get("body")
        };

    socket.emit("form_send", form);
    form.reset();
});

socket.on("forms", (data) => {
    const forms = document.querySelector(#forms); // ????

    forms.innerHTML = data.map((form) => {
        return `
        <p>
        Title: ${form.title} -
        Body: ${form.body} -
        <button id="button-${form.id}> Eliminar </button>
        </p>
        `;
    }).join(" ");
});