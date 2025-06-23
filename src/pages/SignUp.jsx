import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:1000/api/v1/sign-up', {
        username,
        email,
        password,
        address
      });
      setSuccess('Signup successful!');
      setTimeout(() => navigate('/login'), 1500); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#ffffff url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bdd9af75-6e48-4f4b-8e18-a733fbec52d3/derh4hf-5393d9dd-07f4-46f1-8451-c9a0327dd6ac.png/v1/fit/w_828,h_1282,q_70,strp/wallpaper_trafalgar_law_by_manodinha_derh4hf-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcL2JkZDlhZjc1LTZlNDgtNGY0Yi04ZTE4LWE3MzNmYmVjNTJkM1wvZGVyaDRoZi01MzkzZDlkZC0wN2Y0LTQ2ZjEtODQ1MS1jOWEwMzI3ZGQ2YWMucG5nIiwid2lkdGgiOiI8PTEyNDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.et30nnuOByLvwT8JK-652mYDazctMI8A9SCYdMvb3ZM) center center/auto no-repeat content-box local'
      }}>
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '20px' }}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <button type="submit" style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>Sign Up</button>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
            <p style={{ marginTop: '10px' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#007BFF', textDecoration: 'none' }}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SignUp