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
                const result = await booksCollection.insertOne(data);// to insert one at a time
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
            const id= req.params.id;// extract book id from url
            // console.log(id);
            const updateBookData= req.body; //extracts data sent in the request body
            const objectId = new ObjectId(id); //creates a new ObjectId instance based on the id extracted from the request parameters
            const filter = { _id: objectId };   //constructing filter object 
           
            const options= { upsert: true}
            const updateDoc= {
                $set: {
                    ...updateBookData
                }
            }

            //for update

            const result= await booksCollection.updateOne(filter,updateDoc, options)
            res.send(result)
        })
        
        app.delete("/book/:id",async (req, res) => {
            const id= req.params.id;// extract book id from url
           
            const objectId = new ObjectId(id); //creates a new ObjectId instance based on the id extracted from the request parameters
            const filter = { _id: objectId };   //constructs the filter object, where the _id field is matched against the objectId created in the first line.
           
            const result= await booksCollection.deleteOne(filter);  // deletes the book from the collection on basis of id
            res.send(result);
            })
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
