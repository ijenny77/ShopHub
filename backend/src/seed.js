require('dotenv').config()
const mongoose = require('mongoose')
const Product = require('./models/Product')

const products = [
  {
    name: 'Laptop',
    description: 'A powerful laptop for work and play.',
    price: 999,
    category: 'Electronics',
    stock: 10,
    image: '/images/laptop.png',
  },
  {
    name: 'Headphones',
    description: 'Noise-cancelling headphones with rich sound.',
    price: 199,
    category: 'Electronics',
    stock: 25,
    image: '/images/blacksets.png',
  },
  {
    name: 'Puma',
    description: 'Comfortable sneakers for everyday wear.',
    price: 89,
    category: 'Clothing',
    stock: 50,
    image: '/images/shoes.png',
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with plenty of storage.',
    price: 59,
    category: 'Accessories',
    stock: 30,
    image: '/images/bag.png',
  },
  {
    name: 'Water Bottle',
    description: 'Insulated bottle that keeps drinks cold for 24 hours.',
    price: 29,
    category: 'Accessories',
    stock: 100,
    image: '/images/bottle.png',
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness.',
    price: 45,
    category: 'Home',
    stock: 40,
    image: '/images/lamp.png',
  },
]

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log("Done!")
    mongoose.disconnect()
})
.catch(err => console.error('Seed failed:', err))
