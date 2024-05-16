const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// MongoDB configuration
const uri = "mongodb+srv://BookBreeze:seproject24@cluster0.2icqk8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Middleware to parse JSON bodies
router.use(express.json());

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // Specify the database and collection
        const database = client.db("BookInventory");
        const User = database.collection("user_pass");
        const UserInfo = database.collection("user_info");

        // Login route
        router.get('/login', async (req, res) => {
            const { email, password } = req.query;
            const user = await User.findOne({ email });
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            res.status(200).json({ message: 'Login successful', email: user.email });
        });

        // Registration route
      // Registration route
router.post('/register', async (req, res) => {
    const { email, password, name, phone, dob, address } = req.body;
    // Check if any required field is missing or undefined
    if (!email || !password || !name || !phone || !dob || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        // Insert user into 'user_pass' collection
        await User.insertOne({ email, password });

        // Generate new user ID for 'user_info' collection
        const maxId = await getMaxUserId(UserInfo);
        console.log("Max ID:", maxId);
        const newId = (parseInt(maxId) + 1).toString();
        console.log("New ID:", newId);
    
        await UserInfo.insertOne({ "_id": newId, email, name, phone, dob, address });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
async function getMaxUserId(collection) {
    const result = await collection.aggregate([
        { $group: { _id: null, maxId: { $max: { $toInt: "$_id" } } } }
    ]).toArray();
    return result.length > 0 ? result[0].maxId : '0'; // Return '0' if no documents are found
}

connectToDatabase();

module.exports = router;
