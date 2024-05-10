import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Scripts from '../components/LoginScripts'
import Heads from '../components/LoginHeads'

const Login = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:5000/login', {
      const response = await fetch('https://yolohome-smart-home-system-api.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect to the dashboard or any other page after successful login
        navigateTo('/dashboard');
      } else {
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.log(error) // Set error message if login fails
    }
  };
  
  return (
    <div>
      <Heads />
        <form method="POST" action="/login/loginSubmit">
        <div className='vh-100'>
            <div className="box">
      <div className="container">
        <div className="top-header">
          <span>YOLOHOME</span>
          <header>Login</header>
        </div>
        <div className="input-field">
          <input type="text" className="input" onChange={(e) => {setUsername(e.target.value)}} placeholder="User Name" required />
          <i className="bx bx-user" />
        </div>
        <div className="input-field">
          <input type="password" className="input" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" required />
          <i className="bx bx-lock-alt" />
        </div>
        {errorMessage && <p className="error-message" style={{ color: 'white'}}>{errorMessage}</p>}
        <div className="input-field">
          <input type="submit" className="submit" defaultValue="Login" onClick={submit} />
        </div>
        <div className="bottom">
          <div className="left">
            <input type="checkbox" id="check" />
            <label htmlFor="check">Remember me</label>
          </div>
          <div className="right">
            <label><a href="/register">Register</a></label>
          </div>
      </div>
    </div>
  </div>
  </div>
        </form>
<Scripts />
    </div>
  )
}

export default Login