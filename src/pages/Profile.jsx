import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Profile = () => {
// const isLoggedIn=useSelector();
const [Profile,setProfile]=useState();
const headers={
  id: localStorage.getItem("id"),
   Authorization: `Bearer ${localStorage.getItem("token")}`
}
  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get('http://localhost:1000/api/v1/get-user-information',{headers});
     console.log(response);
     setProfile(response.data);
    }
    fetch();
    
  },[]);
  return (
    <div className='bg-zinc-500 px-2 md:px-12 flex flex-col md:flex-row h-screen py-gap-4'>
   
      {!Profile&&
        <div className='w-full h-[100%] flex items-center justify-center '>
          <Loader />
        </div>
        }
      {Profile && (
        <>
      <div className='w-1/6'>
      <Sidebar data={Profile}/>
    </div>
    <div className='w-5/6'>
    <Outlet/>
    </div>
    <div/>
      </>
        )}
    </div>

  )}

export default Profile;
