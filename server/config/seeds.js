//modify got plantasia
const db = require('./connection');
const { User, Product, Plant, Blog } = require('../models');
const cleanDB = require('./cleanDB');
const { plants } = require('./PlantSeeds');
const { products } = require('./ProductSeeds');
const { blogs } = require('./BlogSeeds');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await cleanDB('Product', 'products');
  await cleanDB('Plant', 'plants');
  await cleanDB('Blog', 'blogs');

  await Product.insertMany(products);

  console.log('products seeded 🛍️');

  await Plant.insertMany(plants)

  console.log('plants seeded 🌱');

  const users = await User.insertMany([{
    username: 'Nancy',
    email: 'nancy@abc.com',
    password: '123456',
    orders: [
      {
        products: [products[0]._id, products[1]._id]
      }
    ]
  },
  {
    username: 'Jack',
    email: 'jack@abc.com',
    password: '123456',
  },
  {
    username: 'Catherine',
    email: 'catherine@abc.com',
    password: '123456'
  }
  ]);

  console.log('users seeded 👥');

  await Blog.insertMany(blogs);

  console.log('blogs seeded 📋');

  process.exit();
});

