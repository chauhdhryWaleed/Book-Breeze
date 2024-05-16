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
                newOrderId = await client
                .db("BookInventory")
                .collection('Orders')
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
                maxd = newOrderId.length > 0 ? newOrderId[0]._id : 1; // Default to 0 if no documents found
                let maxId = parseInt(maxd) + 1;
               
                for (const item of cartItems) {
                    for (let i = 0; i < item.quantity; i++) {
                        console.log(i)
                        console.log()
        
                        await client.db("BookInventory").collection('OrderItems').insertOne({
                            _id: max.toString(), 
                            orderId: maxId.toString(),
                            bookId: item.bookId,
                            price: item.price
                        });
                        max = max+1;
                    }
                }
        
                const totalPrice = cartItems.reduce((acc, curr) => acc + curr.price*curr.quantity, 0);
        
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

                // Find the item in the cart
                const cartItem = await cartCollection.findOne({ userId, bookId });
                if (!cartItem) {
                    return res.status(404).json({ message: "Item not found in cart" });
                }

                // If quantity is 1, remove the document
                if (cartItem.quantity === 1) {
                    await cartCollection.deleteOne({ userId, bookId });
                    return res.json({ message: "Item removed from cart" });
                }

                // If quantity is more than 1, decrement quantity by 1
                await cartCollection.updateOne(
                    { userId, bookId },
                    { $inc: { quantity: -1 } }
                );
                res.json({ message: "Item quantity decremented" });
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
        router.get("/getCart", async (req, res) => {
            try {
                const { email } = req.body;

                // Find user ID using the provided email
                const user = await userInfoCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const userId = user._id.toString();

                // Find items in the cart for the user
                const cartItems = await cartCollection.find({ userId }).toArray();

                // Fetch book details for each item and replace bookId with bookTitle
                const itemsWithTitles = await Promise.all(cartItems.map(async (item) => {
                    const book = await booksCollection.findOne({ _id: item.bookId });
                    if (book) {
                        return {
                            ...item,
                            bookTitle: book.bookTitle
                        };
                    } else {
                        // If book not found, remove item from cart
                        await cartCollection.deleteOne({ _id: item._id });
                        return null;
                    }
                }));

                // Filter out any null items (where book not found)
                const filteredItems = itemsWithTitles.filter(item => item !== null);

                res.json(filteredItems); // Return cart items with book titles
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        router.post("/add-to-cart", async (req, res) => {
            try {
                const { email, bookId } = req.body;

                // Find user ID using the provided email
                const user = await userInfoCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const userId = user._id.toString();

                // Check if the item is already in the cart
                const existingItem = await cartCollection.findOne({ userId, bookId });
                if (existingItem) {
                    // If item exists, increment quantity by 1
                    await cartCollection.updateOne(
                        { userId, bookId },
                        { $inc: { quantity: 1 } }
                    );
                    res.json({ message: "Item added to cart", itemId: existingItem._id });
                } else {
                    // If item doesn't exist, add new document to cart
                    const book = await booksCollection.findOne({ _id: bookId });
                    if (!book) {
                        return res.status(404).json({ message: "Book not found" });
                    }
                    const newItem = {
                        userId: userId,
                        bookId: bookId,
                        quantity: 1,
                        price: parseInt(book.price)
                    };
                    const result = await cartCollection.insertOne(newItem);
                    res.json({ message: "Item added to cart", itemId: result.insertedId });
                }
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

module.exports = router;
