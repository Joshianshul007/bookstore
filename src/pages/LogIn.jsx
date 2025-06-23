import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Login component for a React application
// This component handles user login functionality, including form submission and validation.

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      axios.post('http://localhost:1000/api/v1/sign-in', { username, password })
        .then(response => {
          navigate('/cart');
          console.log('Login successful:', response.data);
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
      background: '#ffffff url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bdd9af75-6e48-4f4b-8e18-a733fbec52d3/derh4hf-5393d9dd-07f4-46f1-8451-c9a0327dd6ac.png/v1/fit/w_828,h_1282,q_70,strp/wallpaper_trafalgar_law_by_manodinha_derh4hf-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcL2JkZDlhZjc1LTZlNDgtNGY0Yi04ZTE4LWE3MzNmYmVjNTJkM1wvZGVyaDRoZi01MzkzZDlkZC0wN2Y0LTQ2ZjEtODQ1MS1jOWEwMzI3ZGQ2YWMucG5nIiwid2lkdGgiOiI8PTEyNDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.et30nnuOByLvwT8JK-652mYDazctMI8A9SCYdMvb3ZM) center center/auto no-repeat content-box local'
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p style={{ textAlign: 'center' }}>
          <Link to="/card" style={{ textDecoration: 'none', color: '#007BFF' }}>Card</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
