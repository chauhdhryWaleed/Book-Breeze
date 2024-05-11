// Import required modules
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize Express app
const app = express();
app.use(express.json());

// MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'bookstore';
const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB', err);
        return;
    }
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Register endpoint
    app.post('/register', async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            await db.collection('users').insertOne({
                username,
                email,
                password: hashedPassword
            });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find user by username
            const user = await db.collection('users').findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Validate password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Error logging in', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
