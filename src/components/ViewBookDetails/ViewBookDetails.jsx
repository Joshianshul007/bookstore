import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { GrLanguage } from 'react-icons/gr'

const ViewBookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const token=localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`,{headers:{Authorization: `Bearer ${token}`}});
        console.log(response.data)
        setBookDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
      

    };
    fetchBookDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!bookDetails) return <div className="text-center text-red-500">Book not found.</div>;

  return (
    <div className='px-12 py-8 bg-zinc-900 flex gap-8'>
      <div className='bg-zinc-800 p-4 rounded h-[88vh] w-3/6 flex items-center justify-center'>
        <img src={bookDetails.url} alt={bookDetails.title} className='h-[70vh]' />
      </div>
      <div className='p-4 w-3/6'>
        <h1 className='text-4xl text-zinc-400 font-semibold'>{bookDetails.title}</h1>
        <p className='text-zinc-400 text-lg mt-2'>{bookDetails.author}</p>
        <p className='text-zinc-400 text-lg mt-2'>{bookDetails.desc}</p>
        <p className='text-zinc-400 text-lg mt-2 flex items-center'>
          <GrLanguage className='me-3' />{bookDetails.language}
        </p>
        <p className='text-zinc-400 text-lg mt-2'>Price: ₹{bookDetails.price}</p>
      </div>
    </div>
  );
};

export default ViewBookDetails;




