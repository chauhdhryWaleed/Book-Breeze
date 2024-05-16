const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

// MongoDB configuration
const uri =
  "mongodb+srv://BookBreeze:seproject24@cluster0.2icqk8v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Specify the database and collection
    const database = client.db("BookInventory");
    const Orders = database.collection("Orders");
    const UserInfo = database.collection("user_info");

    // Orders route
    router.get("/orders_by_email", async (req, res) => {
      const { email } = req.body;
      // console.log(email);
      // Find the user's document
      const user = await UserInfo.findOne({ email: email });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Find all orders by this user
      const orders = await Orders.find({ userId: user._id }).toArray();
      res.send(orders);
    });
    // Add this route to your existing file

    // Sum of total prices route
    router.get("/totalSales", async (req, res) => {
      try {
        // Aggregate to sum total prices
        const totalPriceResult = await Orders.aggregate([
          {
            $group: {
              _id: null,
              totalSales: { $sum: "$totalPrice" },
            },
          },
        ]).toArray();

        const totalSales = totalPriceResult[0].totalSales;

        res.json({ totalSales });
      } catch (error) {
        console.error("Error summing total prices:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    // Add this route to your existing file

    router.get("/monthlySales", async (req, res) => {
      try {
        const monthlySales = await Orders.aggregate([
          {
            $group: {
              _id: { $substr: ["$date", 5, 2] }, // Extracting month from the date
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              month: "$_id",
              count: 1,
            },
          },
        ]).toArray();

        // Convert the result to an object with month names and counts
        const salesByMonth = {};
        
        monthlySales.forEach((item) => {
          salesByMonth[item.month] = item.count;
        });

        // Fill missing months with 0
        for (let i = 1; i <= 12; i++) {
          const month = i < 10 ? "0" + i : "" + i; // Add leading zero if month is single digit
          if (!salesByMonth[month]) {
            salesByMonth[month] = 0;
          }
        }
               console.log(typeof(salesByMonth))
        res.json(salesByMonth);
      } catch (error) {
        console.error("Error getting monthly sales:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // Add this route to your existing file

    // Total orders count route
    router.get("/totalOrders", async (req, res) => {
      try {
        // Count documents in the Orders collection
        const totalOrders = await Orders.countDocuments();

        res.json({ totalOrders });
      } catch (error) {
        console.error("Error getting total orders count:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
    // Add this route to your existing file

    // Total customers count route
    router.get("/totalCustomers", async (req, res) => {
      try {
        const totalCustomers = await UserInfo.countDocuments();
        res.json({ totalCustomers });
      } catch (error) {
        console.error("Error getting total customers count:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // Best sellers route
    router.get("/bestSellers", async (req, res) => {
      try {
        const OrderItems = database.collection("OrderItems");
        const Books = database.collection("books");

        // Aggregate to count the number of times each book is sold
        const bestSellers = await OrderItems.aggregate([
          {
            $group: {
              _id: "$bookid",
              timesBought: { $sum: 1 },
            },
          },
          {
            $sort: { timesBought: -1 },
          },
          {
            $lookup: {
              from: "books",
              localField: "_id",
              foreignField: "_id",
              as: "book",
            },
          },
          {
            $unwind: "$book",
          },
          {
            $project: {
              _id: 0,
              bookTitle: "$book.bookTitle",
              imageURL: "$book.imageURL",
              price: "$book.price",
              timesBought: 1,
            },
          },
          {
            $addFields: {
              timesBought: { $toInt: "$timesBought" },
              price: { $toInt: "$price" }, // Convert timesBought to integer
              sales: { $multiply: ["$timesBought", "$price"] },
            },
          },
          {
            $project: {
              bookTitle: 1,
              imageURL: 1,
              sales: 1,
              _id: 0,
            },
          },
        ]).toArray();

        // console.log(bestSellers);
        res.json(bestSellers);
      } catch (error) {
        console.error("Error getting best sellers:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // Latest orders route
    router.get("/latestOrders", async (req, res) => {
      try {
        const Orders = database.collection("Orders");

        const latestOrders = await Orders.aggregate([
          {
            $lookup: {
              from: "user_info",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $project: {
              orderId: "$_id",
              username: "$user.name",
              status: "$status",
              date: "$date",
              totalPrice: "$totalPrice",
            },
          },
          {
            $sort: { date: -1 },
          },
        ]).toArray();
        // console.log("latest",latestOrders);
        res.json(latestOrders);
      } catch (error) {
        console.error("Error getting latest orders:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    router.patch("/updateStatus/:orderId", async (req, res) => {
      try {
        const { orderId } = req.params;
        // console.log(orderId, typeof orderId, req.body);
        const newStatus = req.body.status;
        // console.log(newStatus);
        // Assuming you have a collection named "Orders" in your database
        const Orders = database.collection("Orders");

        // Update the status of the order with the given orderId
        await Orders.updateOne(
          { _id: orderId }, // Assuming you're using ObjectId for IDs
          { $set: { status: newStatus } }
        );

        res.status(200).json({ message: "Order status updated successfully" });
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

module.exports = router;
