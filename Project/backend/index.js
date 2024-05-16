const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
// const cartRoutes = require("./routes/cartRoutes")
// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/orders',orderRoutes)
// app.use("/api/cart",cartRoutes)
// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
