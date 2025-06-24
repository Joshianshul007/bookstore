import React from 'react' 
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
const AllBooks = () => {

  const [data, setData] =useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching all books:', error);
      }
    };
    fetchData();
  },[]);
  return (
    <div>
      {/* get all books */}
      <h1 className='text-2xl font-bold text-center my-4'>All Books</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1'>
        {data && data.map((book) => (
          <div key={book._id} className='border p-2 rounded-md shadow-md w-40 h-56 flex flex-col items-center'>
            <img
              src={book.url}
              alt={book.title}
              className='w-full h-32 object-cover mb-2 rounded'
              style={{ objectFit: 'cover' }}
            />
            <h2 className='text-base font-semibold text-center'>{book.title}</h2>
            <p className='text-gray-600 text-sm'>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default AllBooks
