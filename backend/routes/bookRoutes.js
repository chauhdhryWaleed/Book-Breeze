const express = require('express');
const { MongoClient } = require('mongodb');

const router = express.Router();
const uri = "mongodb+srv://BookBreeze:seproject24@cluster0.2icqk8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("BookInventory");
        const booksCollection = database.collection("books");

        // Upload a book
        router.post("/upload-book", async (req, res) => {
            const data = req.body;
            try {
                // Find the maximum _id
                const maxIdResult = await booksCollectionawait
                .collection('books')
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
                data._id = maxId.toString(); // Set _id
                const result = await booksCollection.insertOne(data); // Insert
                res.json({ message: "Book uploaded successfully", insertedId: result.insertedId });
            } catch (error) {
                console.error("Error uploading book:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        // Get all books
        router.get("/all-books", async (req, res) => {
            try {
                const books = await booksCollection.find().toArray();
                res.send(books);
            } catch (error) {
                console.error("Error fetching all books:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        // Update a book
        router.patch("/book/:id",async (req, res) => {
            try {
                const id = req.params.id;
                const updateBookData = req.body;
                const filter = { _id: id };
                const updateDoc = { $set: updateBookData };
                const options = { upsert: true };
                const result = await booksCollection.updateOne(filter, updateDoc, options);
                if (result.modifiedCount === 1) {
                    res.status(200).send("Book updated successfully.");
                } else {
                    res.status(404).send("Book not found or no changes made.");
                }
            } catch (error) {
                console.error("Error updating book:", error);
                res.status(500).send("Internal server error.");
            }
        });

        // Delete a book
        router.delete("/book/:id",async (req, res) => {
            try {
                const id = req.params.id;
                console.log("Deleting book with ID:", id);
                const filter = { _id: id };
                const result = await booksCollection.deleteOne(filter);
                if (result.deletedCount === 1) {
                    res.status(200).send("Book deleted successfully.");
                } else {
                    res.status(404).send("Book not found.");
                }
            } catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).send("Internal server error.");
            }
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

module.exports = router;
