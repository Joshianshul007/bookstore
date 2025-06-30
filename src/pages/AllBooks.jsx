import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import BookCard from '../BookCard/BookCard'

const AllBooks = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching all books:', error);
        // Optionally handle token expiration here
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
      background: '#ffffff url(https://images.unsplash.com/photo-1637055159652-2b8837731f00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }}
    
    >
      <h1 className='text-2xl font-bold text-center my-4'>All Books</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1'>
        {data && data.map((items, i) => (
          <div key={i} className='bg-zinc-800 rounded p-4 m-2'>
            <Link to={`/view-book-details/${items._id}`} className='no-underline'>
              <BookCard data={items} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBooks