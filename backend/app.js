const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const books=require("./routes/book");
const userRoutes = require("./routes/user");
const favourites = require("./routes/favourites");
app.use(express.json());  // Fix: Add this middleware
app.use("/api/v1", userRoutes);
app.use("/api/v1", books);
app.use("/api/v1", favourites);
// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});