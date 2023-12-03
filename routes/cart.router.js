/* 
Los router se encargan de definir los endpoints y de recibir y responder
las consultas. Dentro de esta logica hacen uso de los managers para 
realizar las operaciones de lectura y escritura de archivos. Para 
peticiones GET utiliza el método getProducts del manager, para peticiones
POST utiliza addProducts, para peticiones PUT utiliza updateProduct, 
etc.
*/

import express from 'express';
import CartManager from '../managers/CartManager.js';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager('../data/products.json');
const jsonFilePath = '../products.json';
const cartManager = new CartManager(jsonFilePath);
await cartManager.init();
// Definir las rutas para el manejo de carritos

// creamos un nuevo carrito // ENDPOINT FUNCIONANDO
router.post('/', async(req, res) => {
    try { 
        const newCart = await cartManager.createCart();

        console.log('Nuevo carrito creado:', newCart);
        res.json({ cart: newCart });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    };
});

// obtener carrito por su ID  // ENDPOINT FUNCIONANDO
router.get('/:cid', async(req, res) => {
    try { 
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);

        // Verifica si el carrito existe
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
            return;
        };

        console.log('Productos en el carrito:', cart.products);
        res.json({ products: cart.products });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    };
});

// agregamos un producto especifico a un carrito especifico // ENDPOINT FUNCIONANDO
router.post('/:cid/product/:pid', async(req, res) => {
    // probado en http://localhost:8080/api/carts/2
    try { 
        const cartId = parseInt(req.params.cid); 
        const productId = parseInt(req.params.pid); // parseInt(req.params.cid) y parseInt(req.params.pid) para obtener los IDs del carrito y del producto de los parámetros de la URL
        const quantity = req.body.quantity || 1;  // Por defecto, agregar 1 unidad

        // Obtiene el carrito asociado al ID
        const cart = await cartManager.getCartById(cartId);

        // Verifica si el carrito existe
        if (!cart) {
            res.status(404).json({ error: 'Carrito no encontrado.' });
            return;
        }

        // Obtiene el producto asociado al ID 
        const product = await productManager.getProductById(productId);

        // Verifica si el producto existe
        if (!product) {
            res.status(404).json({ error: 'Producto no encontrado.' });
            return;
        }

        // Verifica si el producto ya está en el carrito
        const existingProductIndex = cart.products.findIndex(item => item.product.id === productId);

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            // Si el producto no está en el carrito, agregarlo con la cantidad especificada
            cart.products.push({ product, quantity });
        }

        // Guarda los cambios
        await cartManager.saveData();

        console.log(`Producto con ID ${productId} agregado al carrito con ID ${cartId}.`);
        res.json({ message: `Producto con ID ${productId} agregado al carrito con ID ${cartId}.` });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

export default router;
