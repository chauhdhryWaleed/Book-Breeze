const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/bookRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
