const express = require('express');
const LoginRouter = require("./authRoutes")
const app = express();
const port = 3000;
const cors = require('cors');


// Middleware
app.use(cors());
app.use("/api/auth",LoginRouter);


// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});