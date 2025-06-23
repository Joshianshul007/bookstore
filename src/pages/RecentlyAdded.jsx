import React, { useEffect, useState } from 'react'
import axios from 'axios'

const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
        setData(response.data.data); // Move this inside the async function
      } catch (error) {
        console.error('Error fetching recent books:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold text-center my-4'>Recently Added Books</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {data && data.map((book) => (
          <div key={book._id} className='border p-4 rounded-lg shadow-lg'>
            <img src={book.url} alt={book.title} className='w-full h-48 object-cover mb-2' />
            <h2 className='text-xl font-semibold'>{book.title}</h2>
            <p className='text-gray-600'>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentlyAdded