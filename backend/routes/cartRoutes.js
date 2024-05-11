const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const router = express.Router();
const uri = "mongodb+srv://BookBreeze:seproject24@cluster0.2icqk8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectToDatabase() {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");

        const database = client.db("BookInventory");
        const userInfoCollection = database.collection("user_info");
        const booksCollection = database.collection("books");
        const cartCollection = database.collection("Cart");
        const orderCollection = database.collection("Order");
        const orderItemsCollection = database.collection("OrderItems");

        router.post("/confirmOrder", async (req, res) => {
            const email = req.body.email;
        
            try {
                // Get user details based on email
                const userInfo = await client.db("BookInventory").collection('user_info').findOne({ email });
        
                if (!userInfo) {
                    return res.status(404).json({ error: "User not found" });
                }
        
                const userId = userInfo._id;
        
                // Get items from cart collection for the user
                const cartItems = await client.db("BookInventory").collection('Cart').find({ userId }).toArray();
        
                if (cartItems.length === 0) {
                    return res.status(400).json({ error: "Cart is empty" });
                }
        
                // Remove items from cart collection
                await client.db("BookInventory").collection('Cart').deleteMany({ userId });
        
                // Count documents in OrderItems collection and add 1
                let newOrderId = await client
                .db("BookInventory")
                .collection('OrderItems')
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
                let max = parseInt(maxd) + 1;
                console.log(newOrderId)
                
                if (newOrderId.length > 0) {
                    let lastId = newOrderId[0]._id;
                    // Check if lastId is a valid numeric string
                    if (/^\d+$/.test(lastId)) {
                        max = parseInt(lastId) + 1;
                    } else {
                        // Handle non-numeric _id values if necessary
                        console.error("Invalid _id format:", lastId);
                    }
                }
                console.log(max)
                // Get the maximum orderid and add 1
                const maxOrderId = await client.db("BookInventory").collection('Orders').find().sort({_id: -1}).limit(1).toArray();
                let maxId = 0;
                if (maxOrderId.length > 0) {
                    maxId = parseInt(maxOrderId[0]._id) + 1;
                }
               
                // Insert items into OrderItems one by one
                for (const item of cartItems) {
                    await client.db("BookInventory").collection('OrderItems').insertOne({
                        _id: max.toString(), 
                        orderid: maxId.toString(),
                        bookid: item.bookId,
                        price: item.price
                    });
                                    // Calculate total price

                max = max+1;
                }
        
                const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price, 0);
        
                // Insert into Orders collection
                await client.db("BookInventory").collection('Orders').insertOne({
                    _id: maxId.toString(), // Generate new ObjectId
                    userId: userId,
                    date: new Date().toISOString().split('T')[0],
                    totalPrice: totalPrice,
                    status: "Pending"
                });
        
                res.status(200).json({ message: "Order confirmed successfully" });
        
            } catch (error) {
                console.error("Error confirming order:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });

        router.delete("/remove", async (req, res) => {
            try {
                const { email, bookId } = req.body;

                // Find user ID using the provided email
                const user = await userInfoCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const userId = user._id.toString();

                // Find the specific item in the cart and delete it
                const result = await cartCollection.deleteOne({ userId, bookId });

                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: "Book not found in cart" });
                }

                res.json({ message: `Removed book ${bookId} from the cart for user ${email}` });
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
        router.get("/getCart", async (req, res) => {
            try {
                const { email } = req.body;

                const user = await userInfoCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const userId = user._id.toString();

                const cartItems = await cartCollection.find({ userId }).toArray();

                const cartData = [];

                for (const item of cartItems) {
                    const book = await booksCollection.findOne({ _id: item.bookId });
                    if (book) {
                        cartData.push({
                            title: book.bookTitle,
                            price: item.price
                        });
                    }
                }

                res.json(cartData);
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
        router.post("/add-to-cart", async (req, res) => {
            const { email, bookId } = req.body;
            console.log(email,bookId);
            try {
                const user = await userInfoCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                
                const book = await booksCollection.findOne({ _id: bookId });
                if (!book) {
                    return res.status(404).json({ message: "Book not found" });
                }

                const cartItem = {
                    userId: user._id.toString(),
                    bookId,
                    price: book.price
                };

                const result = await cartCollection.insertOne(cartItem);
                res.json({ message: "Item added to cart", insertedId: result.insertedId });
            } catch (error) {
                console.error("Error adding to cart:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

module.exports = router;
