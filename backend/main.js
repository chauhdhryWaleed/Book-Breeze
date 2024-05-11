const express = require('express');
const LoginRoter = require("./authRoutes")
const BookRouter = require("./bookRoutes")
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware
app.use(cors());
app.use("/api/auth",LoginRoter);
app.use("/book",BookRouter);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});