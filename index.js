const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");

// Definir tu esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
// Proveer los resolvers para tu esquema
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// Crear una instancia de ApolloServer
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });


// Conexión a MongoDB
mongoose
  .connect(
    "mongodb+srv://Roosevelt08:vLwsCAKQGNhdIcW8@cluster0.fohbdob.mongodb.net/EcommerceProject?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.log(err));

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Uso de rutas
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});
// Espera a que Apollo Server inicie
server.start().then((res) => {
  // Aplicar el middleware de Apollo a tu aplicación de Express
  server.applyMiddleware({ app });
  // Iniciar servidor de express
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `🚀Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});


