const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const books = require("./routes/book");
const userRoutes = require("./routes/user");
const favourites = require("./routes/favourites");
const orderRoutes = require("./routes/order"); // Assuming you have an order route
const User = require("./models/user"); // Assuming you have a User model


const cart= require("./routes/cart"); 
// 
// Assuming you have a cart route
// const Order = require("./routes/order");
const cors = require("cors");

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Fixed typo: "DELET1E" -> "DELETE"
}));
app.use(express.json());
// Route mounting
app.use("/api/v1", userRoutes);
app.use("/api/v1", cart); // Mounting the cart route

// app.use("/api/v1", Order);
app.use("/api/v1", favourites);
app.use("/api/v1", books); // books, not User

// Remove this line, 'User' is not defined and not needed:
// app.use("/api/v1", User);

// Remove duplicate favourites route mounting
// app.use("/api/v1", favourites);


// Start server
const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server started in port ${PORT}`))

