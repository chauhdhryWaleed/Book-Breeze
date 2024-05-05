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
        const booksCollection = database.collection("books");

        // Upload a book route
        router.post("/upload-book", async (req, res) => {
            const data = req.body;
            try {
                const result = await booksCollection.insertOne(data);
                res.json({ message: "Book uploaded successfully", insertedId: result.insertedId });
            } catch (error) {
                console.error("Error uploading book:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        // Get all books route
        router.get("/all-books", async (req, res) => {
            try {
                const books = await booksCollection.find().toArray();
                res.send(books);
            } catch (error) {
                console.error("Error fetching all books:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        // Update a book route
        router.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            const updateBookData = req.body;
            const objectId = new ObjectId(id);
            const filter = { _id: objectId };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    ...updateBookData
                }
            };
            const result = await booksCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // Delete a book route
        router.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const objectId = new ObjectId(id);
            const filter = { _id: objectId };
            const result = await booksCollection.deleteOne(filter);
            res.send(result);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

module.exports = router;
