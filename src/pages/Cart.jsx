import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BookCard from '../BookCard/BookCard'

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Replace USER_OBJECT_ID_HERE with the actual logged-in user's id
        const response = await axios.get('http://localhost:1000/api/v1/get-cart', {
          headers: {
            id:localStorage.getItem('id') ,
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        });
        setCartItems(response.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold text-center my-4'>Your Cart</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item, i) => (
            <div key={i} className='bg-zinc-800 rounded p-4 m-2'>
              <Link to={`/view-book-details/${item._id}`} className='no-underline'>
                <BookCard data={item} />
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}
export default Cart;