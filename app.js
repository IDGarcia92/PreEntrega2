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

const productManager = new ProductManager('./products.json');
productManager.init();

// realizamos la conexion cliente - websocket
io.on('connection', async(socket) => {
    console.log('Cliente conectado al WebSocket');

    const products = await productManager.getProducts();

    socket.emit('forms', products); // envia los productos al cliente en cuanto se conecta
    socket.on("form_send", async(data) => {
        console.log(data);
        // recibe la info del cliente
        try {
            const productList =  {
                title: data.title,
                description: data.description,
                code: data.code,
                price: data.price,
                stock: data.stock,
                category: data.category,
                body: data.body
                };

                await ProductManager.addProduct(productList);
                socket.emit("forms", [productList]); //renvia el prod al cliente

        } catch (error) {
            console.log(error);
        }
    });
});


export { io, Myserver};
