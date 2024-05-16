

const express = require('express');
const LoginRouter = require("./routes/authRoutes")
const BookRouter = require("./routes/bookRoutes")
const CartRouter = require("./routes/cartRoutes")
const OrderRouter = require("./routes/orderRoutes")
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use("/api/auth",LoginRouter);
app.use("/book",BookRouter);
app.use("/api/cart",CartRouter);
app.use("/api/orders",OrderRouter);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});