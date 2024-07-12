const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

//crear un nuevo pedido
router.post('/', async (req, res) => {
    const { user, orderItems } = req.body;

    try {
        const itemsWithPrices = await Promise.all(
            orderItems.map(async item => {
                const product = await Product.findById(item.product); // 'Product' está definido
                if (!product) {
                    throw new Error('Producto no encontrado');
                }
                if (product.stock < item.quantity) {
                    throw new Error('Cantidad solicitada supera el stock disponible');
                }
                // Reduce el stock
                product.stock -= item.quantity;
                await product.save();

                return {
                    ...item,
                    price: product.price
                };
            })
        );

        const totalPrice = itemsWithPrices.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        const newOrder = new Order({
            user,
            orderItems: itemsWithPrices,
            totalPrice
        });

        await newOrder.save();
        res.status(201).send('Pedido creado con éxito.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = router;
