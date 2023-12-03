/* 
Los router se encargan de definir los endpoints
y de recibir y responder las consultas. 
Dentro de esta logica hacen uso de los managers para  realizar las 
operaciones de lectura y escritura de archivos. 
Para  peticiones GET utiliza el método getProducts del manager, 
para  peticiones POST utiliza addProducts, para peticiones PUT utiliza
updateProduct, etc.
*/

import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const jsonFilePath = '../products.json'; 
const productManager = new ProductManager(jsonFilePath);
await productManager.init();

const products = await productManager.getProducts(jsonFilePath);

/*
// los productos los coloque aca porque no pude conectarme con el archivo json
const products = [
    {
        "title": "pantalon",
        "description": "ropa",
        "code": "pantalon1",
        "price": 10000,
        "stock": 1000,
        "category": "vestimenta",
        "thumbnails": "pantalon1.jpg",
        "status": true,
        "id": 1
    },
    {
        "title": "remera",
        "description": "ropa",
        "code": "remera1",
        "price": 4500,
        "status": true,
        "stock": 1000,
        "category": "vestimenta",
        "thumbnails": "remera1.jpg",
        "id": 2
    },
    {
        "title": "musculosa",
        "description": "ropa",
        "code": "musculosa1",
        "price": 2500,
        "status": true,
        "stock": 1000,
        "category": "vestimenta",
        "thumbnails": "musculosa1.jpg",
        "id": 3
    },
    {
        "title": "short",
        "description": "ropa",
        "code": "short1",
        "price": 3000,
        "stock": 1000,
        "category": "vestimenta",
        "thumbnails": "short1.jpg",
        "status": true,
        "id": 4
    },
    {
        "title": "saco",
        "description": "ropa",
        "code": "saco1",
        "price": 15000,
        "stock": 1000,
        "category": "ropa",
        "thumbnails": "saco1.jpg",
        "status": true,
        "id": 5
    },
    {
        "title": "jean",
        "description": "ropa",
        "code": "jean1",
        "price": 8000,
        "stock": 1000,
        "category": "ropa",
        "thumbnails": "jean1.jpg",
        "status": true,
        "id": 6
    },
    {
        "title": "pollera",
        "description": "ropa",
        "code": "pollera1",
        "price": 5000,
        "stock": 1000,
        "category": "ropa",
        "thumbnails": "pollera1.jpg",
        "status": true,
        "id": 7
    },
    {
        "title": "ojotas",
        "description": "calzado",
        "code": "ojotas1",
        "price": 4000,
        "stock": 1000,
        "category": "calzado",
        "thumbnails": "ojotas1.jpg",
        "status": true,
        "id": 7
    },
    {
        "title": "zapatillas",
        "description": "calzado",
        "code": "zapatillas1",
        "price": 30000,
        "stock": 1000,
        "category": "calzado",
        "thumbnails": "zapatillas1.jpg",
        "status": true,
        "id": 8
    },
    {
        "title": "zapatos",
        "description": "calzado",
        "code": "zapatos1",
        "price": 50000,
        "stock": 1000,
        "category": "calzado",
        "thumbnails": "zapatos1.jpg",
        "status": true,
        "id": 9
    },
    {
        "title": "vestido",
        "description": "ropa",
        "code": "vestido1",
        "price": 20000,
        "stock": 1000,
        "category": "vestimenta",
        "thumbnails": "vestido1.jpg",
        "status": true,
        "id": 10
    }
];
*/

//ruta principal donde mostraremos la lista de productos
router.get('/', (req, res) => {
    res.render('home.hbs', {
        title: "Lista de Productos",
        fileCss: 'styles.css',
        products: products
    });
});


// Ruta para "/realTimeProducts" (productos en tiempo real)
router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts.hbs', { 
        title: "Lista de Productos en tiempo real",
        fileCss: 'styles.css',
        products: products 
    });
});


export default router;