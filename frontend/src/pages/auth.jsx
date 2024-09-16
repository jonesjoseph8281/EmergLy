import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('http://your-backend-url/login', {
        username,
        password,
      });

      console.log('Response:', response.data);
      // Handle successful response here (e.g., redirect, show success message)
    } catch (error) {
      console.error('Error:', error);
      // Handle error here (e.g., show error message)
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active"> Sign In </h2>
        <a href="signup.html">
          <h2 className="inactive underlineHover"> Sign Up </h2>
        </a>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            className="fadeIn second"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Log In"
          />
        </form>
      </div>
    </div>
  );
};

export default Auth;

