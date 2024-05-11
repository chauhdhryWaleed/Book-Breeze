const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());
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
        
        // Define endpoint to upload a book
        app.post("/upload-book", async (req, res) => {
            const data = req.body;
            try {
                // Query the collection to find the maximum _id
                const maxIdResult = await booksCollection.find().sort({_id: -1}).limit(1).toArray();
                
                let maxId = 0;
                if (maxIdResult.length > 0) {
                    maxId = parseInt(maxIdResult[0]._id) + 1; // Increment the maximum _id by one
                    console.log(maxId);
                }
        
                // Set the _id of the new document to the incremented value
            
                console.log("add");
                
                data._id = maxId.toString();
                // Insert the new document
                const result = await booksCollection.insertOne(data);
        
                res.json({ message: "Book uploaded successfully", insertedId: result.insertedId });
            } catch (error) {
                console.error("Error uploading book:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
        

        //get all the books from database
        app.get("/all-books", async (req, res) => {
            try {
                const books = await booksCollection.find(); // Find all books
                const result = await books.toArray(); // Convert cursor to array
                res.send(result); // Send the array of books as response
            } catch (error) {
                console.error("Error fetching all books:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        //update a book data: patch or update method 

        app.patch("/book/:id",async (req, res) => {
            try {
                console.log("Updating book...");
                
                const id = req.params.id; // Extract book id from URL
                const updateBookData = req.body; // Extract data sent in the request body
        
                const filter = { _id: id }; // Construct filter object using string _id value
        
                const updateDoc = { $set: updateBookData }; // Prepare update document using $set operator
        
                // Options for update (upsert: true means insert if document not found)
                const options = { upsert: true };
        
                // Perform the update operation
                const result = await booksCollection.updateOne(filter, updateDoc, options);
        
                if (result.modifiedCount === 1) {
                    // Document updated successfully
                    res.status(200).send("Book updated successfully.");
                } else {
                    // Document not found or no modifications made
                    res.status(404).send("Book not found or no changes made.");
                }
            } catch (error) {
                console.error("Error updating book:", error);
                res.status(500).send("Internal server error.");
            }
        })
        
        app.delete("/book/:id",async (req, res) => {
            try {
                const id = req.params.id; // extract book id from url
                console.log("Deleting book with ID:", id);
        
                const filter = { _id: id }; // constructs the filter object based on the string _id value
        
                const result = await booksCollection.deleteOne(filter); // deletes the book from the collection based on id
                if (result.deletedCount === 1) {
                    res.status(200).send("Book deleted successfully.");
                } else {
                    res.status(404).send("Book not found.");
                }
            } catch (error) {
                console.error("Error deleting book:", error);
                res.status(500).send("Internal server error.");
            }
            }   )
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
    

}

connectToDatabase();

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});