import React from 'react' 
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookCard from '../BookCard/BookCard'
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
        {data && data.map((items,i) => (
          <div key={i} className='bg-zinc-800 rounded p-4 m-2'>
              <BookCard data={items} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default AllBooks
