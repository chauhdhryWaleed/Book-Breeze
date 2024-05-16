const express = require('express');
const mongoose = require('mongoose');
const book = require("./models/book")
// const bodyParser = require('body-parser');
// const cors = require('cors');
require('dotenv').config()

const setnewbook = mongoose.model('book', bookSchema);




console.log(process.env.MONGO_URI) 
const app = express();
const PORT =  3000;
app.use(bodyParser.json());
// app.use(cors());
app.post('/addBook', (req, res) => {

    res.send('POST request to the homepage')
  })
// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/shopping-cart', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Define a schema for shopping cart items
// const cartItemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   quantity: Number,
// });

// const CartItem = mongoose.model('CartItem', cartItemSchema);

// Route to get all cart items
// app.get('/api/cart', async (req, res) => {
//   try {
//     const cartItems = await CartItem.find();
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Route to add a new item to the cart
// app.post('/api/cart', async (req, res) => {
//   const { name, price, quantity } = req.body;
//   const newItem = new CartItem({ name, price, quantity });
//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(PORT, () => {
  console.log(`Server is running on port  http://localhost:${PORT}`);
});
