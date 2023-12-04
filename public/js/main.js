// se hara cargo de lo que ocurra en main.hbs
// es el JS para el lado del CLIENTE 
console.log('mensaje del lado del cliente');

//const socket = new WebSocket('ws://localhost:5000/realTimeProducts');

const socket = io();

const form = document.querySelector("forms");

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

const forms = document.querySelector('#forms'); // ????

socket.on("forms", (data) => {
    console.log(data);
    
    data.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <p> 
        Title: ${product.title} -
        Body: ${product.body} -
        <button id= "button-${form.id}> Eliminar </button>
        </p>
        `;
        forms.appendChild(li);
    })
    
});