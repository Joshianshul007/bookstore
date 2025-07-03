import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'
import {Routes,Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import Login from './pages/LogIn'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'

const App = () => {
  const dispatch = useDispatch();
  
  const role =useSelector((state) => state.auth.role)
  useEffect(() => {
  
    if( localStorage.getItem("id") &&
     localStorage.getItem('token') &&
      localStorage.getItem("role")){

      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
     
      }
    }, []);
  
  return ( 
    <div>
   
      <Navbar/>
      <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/all-books' element={<AllBooks/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/signup' element={<SignUp/>} />
      <Route exact path='/Cart' element={<Cart/>} />
      <Route exact path='/Profile' element={<Profile/>} />
      <Route exact path='/view-book-details/:id' element={<ViewBookDetails/>} />

      </Routes>
      <Footer/>
     
    </div>
  ) 
}

export default App
