const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

// MongoDB configuration
const uri = "mongodb+srv://BookBreeze:seproject24@cluster0.2icqk8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

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
            const { email, password } = req.body;
            console.log(email, password);
            const user = await User.findOne({ email }); // Searching for email instead of username
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            res.status(200).json({ message: 'Login successful', email: user.email });
        });

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
                await User.insertOne({ email, password });
                const maxIdResult = await booksCollectionawait
                .collection('user_info')
                .aggregate([
                    {
                        $project: {
                            _id: 1,
                            orderId: { $toInt: "$_id" }
                        }
                    },
                    {
                        $sort: { orderId: -1 }
                    },
                    {
                        $limit: 1
                    }
                ])
                .toArray();
                let maxd = newOrderId.length > 0 ? newOrderId[0]._id : 1; // Default to 0 if no documents found
                let maxId = parseInt(maxd) + 1;
                await UserInfo.insertOne({ "_id":maxId.toString(),email, name, phone, dob, address });
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

connectToDatabase();

module.exports = router;
