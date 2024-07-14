const Product = require('../models/Product');

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    products: async () => {
      try {
        const products = await Product.find({});
        return products;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
  }
};

module.exports = resolvers;
