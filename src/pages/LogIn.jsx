import React, { useState } from 'react'
import axios from 'axios';
import { authActions } from '../store/auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Login component for a React application
// This component handles user login functionality, including form submission and validation.

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to validate the form inputs
  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6 || password.length > 100) {
      newErrors.password = 'Password must be 6-100 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form inputs before making the API call
    if (validate()) {
      axios.post('http://localhost:1000/api/v1/login', { email, password })
        .then(response => {
          console.log('Login successful:', response.data.role);
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('role', response.data.role);
          navigate("/profile")
        })
        .catch(error => {
          console.error('Login error:', error);
          if (error.response && error.response.data) {
            setErrors({ server: error.response.data.message || 'Login failed' });
          } else {
            setErrors({ server: 'An unexpected error occurred' });
          }
        });
    }
  }

  return ( 
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#ffffff url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        {errors.server && <p style={{ color: 'red' }}>{errors.server}</p>}
        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>Login</button>
      
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Don't have an account?  <br /> <Link to="/signup">Sign Up</Link>
        </p>
       
      </form>
    </div>
  )
}

export default Login
