// se hara cargo de lo que ocurra en main.hbs
// es el JS para el lado del CLIENTE 
console.log('mensaje del lado del cliente');

//const socket = new WebSocket('ws://localhost:5000/realTimeProducts');

const socket = io();

const productsList = document.querySelector('#output');

productsList.addEventListener('open', () => {
    console.log('Conexión WebSocket establecida');
    const productsRealTimeList = new productsRealTimeList(productsList);
    console.log(productsRealTimeList);
});
