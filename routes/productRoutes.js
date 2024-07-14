const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const app = express();

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.use(express.json());

  // Ruta para obtener todos los productos
  router.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res
        .status(500)
        .send({
          message: 'Error al obtener los productos',
          error: error.toString(),
        });
    }
  });

  //Ruta para crear un producto
  router.post('/api/product', async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        stock,
        category,
      });
      await newProduct.save();
      res.status(201).send('Producto creado con éxito.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}

// Exporta el router
module.exports = router;
