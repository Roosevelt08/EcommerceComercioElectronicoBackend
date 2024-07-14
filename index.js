const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs"); // Asegúrate de importar typeDefs correctamente
const resolvers = require("./graphql/resolvers"); // Asegúrate de importar resolvers correctamente

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

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

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(
      `🚀Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
