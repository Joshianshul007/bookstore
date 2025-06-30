const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { authenticateToken } = require('./userAuth');
// create add to cart functionality
router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try {
        const { bookId, id } = req.headers; // Assuming bookId and id are sent in the request body
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookId);
        if (isBookInCart) {
            return res.status(200).json({ 
                message: 'Book is already in cart',
                status: 'success' 
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: {
                cart: bookId
            }
        });
        return res.status(200).json({ 
            message: 'Book added to cart',
            status: 'success'
        });
    } catch (error) {
        console.error('Error adding book to cart:', error);
        return res.status(500).json({ message: 'An Error Occured' });
    }
});
// remove book from cart
router.delete('/remove-from-cart/:bookid', authenticateToken, async (req, res) => {
    try {
        const { bookId} = req.params;
        const { id } = req.headers; // Assuming id is sent in the request headers
        await User.findByIdAndUpdate(id, {
            $pull: {
                cart: bookId
            }
        });
        return res.status(200).json({
            message: 'Book removed from cart',
            status: 'success'
        });

    } catch (error) {
        console.error('Error removing book from cart:', error);
        return res.status(500).json({ message: 'An Error Occured' });

    }
    });
// get cart of particular user
router.get('/get-cart', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // Assuming id is sent in the request headers
        const userData = await User.findById(id).populate('cart');
        const cart=userData.cart.reverse(); // Reverse the cart to show the latest added books first
         // Populate cart with book details
        return res.status(200).json({
            status: 'success',
            data: cart
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ message: 'An Error Occured' });
    }

}
    
);
module.exports = router;

