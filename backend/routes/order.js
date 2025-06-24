const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const router = require("./book");
const User = require("../models/user");
const { data } = require("react-router-dom");


router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { bookId } = req.body;
    const { order } =req.body // Assuming req.user is set by authenticateToken middleware
   
    for (const orderData of bookId) {
      const newOrder = new Order({
        user:id,
        book: orderData._id, // Assuming bookId is an array of book IDs
        status: "Order Placed",
      });
      const savedOrder = await newOrder.save();
    //   saving  order in user model
    await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id } // Assuming User model has an 'orders' field
        }
    );
    // clearing cart after placing order
    await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id } // Assuming User model has a 'cart' field    
    });
    }

return res.json({
      message: "Order placed successfully",
      status: "success",
    });
    } 
    catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({
      message: "an error occured while placing order",
    });
}
});
  //get order history of partiular user
  router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // Assuming user ID is sent in headers
        const user = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'book' } // Populate book details in the orders
        });
        
        const orderData = userData.orders.reverse();
         // Reverse the order history to show the latest orders first
         return res.json({
            status: "success",
            data: orderData,
        });
        
    } catch (error) {
        console.error("Error fetching order history:", error);
        return res.status(500).json({ message: "An error occurred while fetching order history" });
    }
});
//update order  --admin
router.put("/update-order", authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndUpdate(orderId, {
            status: req.body.status });
            return res.json({
                message: "Order updated successfully",
                status: "success",
            });
        }
            catch(error) {
        console.error("Error updating order:", error);
        return res.status(500).json({ message: "An error occurred while updating the order" });
    }
    
});

module.exports = router;