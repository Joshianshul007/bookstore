import React, { useState } from 'react'
import { FaGripLines } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const links=[
        {
            title:"Home",
            link: "/",
        },
        {
            title:"About Us",
            link: "/about-us",
        },
        {
            title:"All Books",
            link: "/all-books",
        },
        {
            title:"Cart",
            link: "/cart",
        },
        {
            title:"Profile",
            link: "/profile",
        },
        
        

    ];
   
  return (
    <>
    <nav className='z-50 relative bg-zinc-700 text-white px-8 py-2 flex items-center justify-between' > 
        <div className='flex items-center gap-2'>
            <img className='h-10' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"></img>
        <h1 className='text-2xl font-semibold'>BooksTomb</h1>
        </div>
        <div className='flex items-center gap-2 py-4'>
       
            {links.map((items,i)=>(
                <Link to={items.link} className='hover:text-blue-600 transition-all duration-300' key={i}>{items.title}
            </Link>))}
       
       <div className='flex-col justify-center  '>
             <Link to="/" className='mb-8 bg-blue-500 rounded px-2 py-2 hover:bg-white hover:text-zinc-700 transition-all duration-200 '>
             SignUp
             </Link>
             <Link to="/login" className='mb-8 text-black px-4 py-1 border bg-blue-500 rounded hover:bg-white-500 hover:text-yellow-950 transition-all duration-300'>
             LogIn
             </Link>
             </div>
             <button className='text-2xl hover:text-zinc-400'>
                <FaGripLines/>
             </button>
        </div>
    </nav>
    
    </>
  )
}

export default Navbar
