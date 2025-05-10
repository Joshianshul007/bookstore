const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");

const userRoutes = require("./routes/user");

app.use(express.json());  // Fix: Add this middleware
app.use("/api/v1", userRoutes);

// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
