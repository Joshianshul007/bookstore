import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard';
import Loader from '../components/Loader/Loader';


const RecentlyAdded = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching recent books:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='mt-8 px-4'>
      <h1 className='text-3xl text-yellow-200 my-4'>Recently Added Books</h1>
      {!data && <div className='flex items-center justify-center my-8'><Loader /><div/></div>}
      <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {data && data.map((items,i) => (
          <div key={i}>
            <BookCard data={items} />
            <p className='text-blue-700 text-sm font-semibold mt-1'>₹{items.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

            
            
        
export default RecentlyAdded