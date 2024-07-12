const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importa el modelo de usuario

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('Usuario registrado con éxito.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Exporta el router
module.exports = router;
