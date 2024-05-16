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
                const maxIdResult = await database
                .collection('books')
                .aggregate([//aggregation framework to find highest  projects the _id field and converts it to an integer ($toInt) to perform sorting based on numeric values. Then, it sorts the documents in descending order of _id and limits the result to one document (the one with the maximum _id).
                    {
                        $project: {//project reshape documents bcz id is converted into int
                            _id: 1,
                            orderId: { $toInt: "$_id" }
                        }
                    },
                    {
                        $sort: { orderId: -1 }//-1 for descending order
                    },
                    {
                        $limit: 1// restricts the number of documents that pass through the pipeline.
                    }
                ])
                .toArray();//converts to array 
                let maxd = maxIdResult.length > 0 ? maxIdResult[0]._id : 1; // Default to 0 if no documents found
                let maxId = parseInt(maxd) + 1;
                data._id = maxId.toString(); // Set _id
                const result = await booksCollection.insertOne(data); // Insert     wait for a promise to resolve.
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
                const filter = { _id: id };//filtering on id 
                const updateDoc = { $set: updateBookData }; //$set operator is used to update specific fields with the values provided in updateBookData
                const options = { upsert: true }; //case, upsert: true indicates that if no matching document is found, a new document should be created.

                const result = await booksCollection.updateOne(filter, updateDoc, options);//his method updates a single document that matches the filter criteria with the specified update document.
                if (result.modifiedCount === 1) {// result.modifiedCount === 1, it means the update was successful, and a 200 status with a success message is sent.
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
                const id = req.params.id; //Retrieves the book ID from the URL parameters
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
