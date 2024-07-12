const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb+srv://Roosevelt08:vLwsCAKQGNhdIcW8@cluster0.fohbdob.mongodb.net/EcommerceProject?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.log(err));

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Uso de rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
  });
  

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
