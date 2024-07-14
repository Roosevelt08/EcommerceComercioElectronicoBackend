const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    description: String
    price: Float
    stock: Int
    category: String
  }

  type Query {
    products: [Product]
    hello: String
  }
`;

module.exports = typeDefs;
