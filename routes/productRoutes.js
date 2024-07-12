const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//Ruta para crear un producto
router.post('/', async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    try {
        const newProduct = new Product({ name, description, price, stock, category });
        await newProduct.save();
        res.status(201).send('Producto creado con éxito.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los productos', error: error.toString() });
    }
})



// Exporta el router
module.exports = router;
