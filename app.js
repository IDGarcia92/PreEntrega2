/* app.js se encarga de levantar el servidor, => OK
hacer uso de los middlewares => OK
y configuraciones del servidor => OK
*/

import express from 'express';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import viewRouter from "./routes/views.router.js"; 
import handlebars from 'express-handlebars';
import * as path from 'path';
import ProductManager from './managers/ProductManager.js';


const app = express();
const PORT = 8080;
const Myserver = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// instancia de socket
const io = new Server(Myserver);

// Middlewares
app.use(express.json());
app.use(express.urlencoded( { extended : true } ));

// configuramos el motor de plantillas 
app.engine("hbs", handlebars.engine({ 
    extname: 'hbs', // extensión
    defaultLayout: 'main' //plantilla principal donde se renderizarán las demás
    })
);

// seteamos el motos de vistas
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// public 
app.use(express.static(`${__dirname}/public`));

// ruta principal 
app.use('/', viewRouter);

// ruta a productos en tiempo real
app.use('/realTimeProducts', viewRouter);

// realizamos la conexion cliente - websocket
io.on('connection', (socket) => {
    console.log('Cliente conectado al WebSocket');
});

/*
socket.on("form_send", async(data) => {
    console.log(data);
    try {
        const productList = new ProductList (
            data.title,
            data.description,
            data.code,
            data.price,
            data.stock,
            data.category,
            data.body
        );
        await ProductManager.saveData(form);
        socket.emit("forms", ProductManager.getProduc)
    } catch (error) {
        console.log(error);
    }
});
*/

export { io, Myserver};
