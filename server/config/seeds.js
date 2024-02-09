//modify got plantasia
const db = require('./connection');
const { User, Product, Plant, Blog } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('User', 'users');
  await cleanDB('Product', 'products');
  await cleanDB('Plant', 'plants');
  await cleanDB('Blog', 'blogs');
  
  const products = await Product.insertMany([
    {
      name: 'Planter',
      image: 'planter.jpg',
      price: 19.99,
      quantity: 60
    },
    {
      name: 'Gloves',
      image: 'gloves.jpg',
      price: 12.99,
      quantity: 100
    },
    {
      name: 'Watering Can',
      image: 'watering-can.jpg',
      price: 7.99,
      quantity: 20
    }
  ]);

  console.log('products seeded 🛍️');

  const plants = await Plant.insertMany([
    { plantName: 'Cactus', image: 'cactus.jpg' },
    { plantName: 'Money Tree', image: 'money-tree.jpg'  },
    { plantName: 'Zamofilia', image: 'zamofilia.jpg'  }
  ]);

  

  console.log('plants seeded 🌱');

  const users = await User.insertMany([{
    firstName: 'Nancy',
    lastName: 'Woods',
    email: 'nancy@abc.com',
    password: '123456',
    orders: [
      {
        products: [products[0]._id, products[1]._id]
      }
    ]
  },
  {
    firstName: 'Jack',
    lastName: 'McDonald',
    email: 'jack@abc.com',
    password: '123456',
    plants: [plants[0], plants[2]]
  },
  {
    firstName: 'Catherine',
    lastName: 'Moore',
    email: 'catherine@abc.com',
    password: '123456'
  }
]);

  console.log('users seeded 👥');

  const blogs = await Blog.insertMany([
    {
      blogTitle: 'My Small Garden',
      blogText: 'My plants are so beautiful and healthy!',
      blogAuthor: users[0]._id,
    },
  ]);

  console.log('blogs seeded 📋');

  process.exit();
});

