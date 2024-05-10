import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Scripts from '../components/RegisterScripts'
import Heads from '../components/RegisterHeads'
import axios from "axios"

const Register = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([])
  const [emailaddress, setEmailAddress] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const navigateTo = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:5000/register', {
      const response = await fetch('https://yolohome-smart-home-system-api.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, emailaddress }),
      });

      if (response.ok) {
        // Redirect to the dashboard or any other page after successful login
        navigateTo('/login');
      }
    } catch (error) {
      console.log(error) // Set error message if login fails
    }
  };

  return (
    <div>
        <Heads />
        <form method="POST" action="/register/registerSubmit">
        <div className="vh-100" style={{ backgroundImage: "url('images/bg.png')", backgroundPosition: "center" }}>
        <div className="authincation h-100">
  <div className="container h-100">
    <div className="row justify-content-center h-100 align-items-center">
      <div className="col-md-6">
        <div className="authincation-content">
          <div className="row no-gutters">
            <div className="col-xl-12">
              <div className="auth-form">
                <h4 className="text-center mb-4">Sign up your account</h4>
                <form action="index.html">
                  <div className="mb-3">
                    <label className="mb-1"><strong>Username</strong></label>
                    <input type="text" className="form-control" onChange={(e) => {setUsername(e.target.value)}} placeholder="username" />
                  </div>
                  <div className="mb-3">
                    <label className="mb-1"><strong>Email</strong></label>
                    <input type="email" className="form-control" onChange={(e) => {setEmailAddress(e.target.value)}} placeholder="hello@example.com" />
                  </div>
                  <div className="mb-3">
                    <label className="mb-1"><strong>Password</strong></label>
                    <input type="password" className="form-control" onChange={(e) => {setPassword(e.target.value)}} defaultValue="Password" />
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-block" onClick={submit} >Sign me up</button>
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p>Already have an account? <a className="text-primary" href="/login">Sign in</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Register