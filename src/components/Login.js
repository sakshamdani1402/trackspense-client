import React, { useState } from 'react';
import login from '../images/login.svg'
import { useLocation } from 'wouter';
const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [location, setLocation] = useLocation();
  //let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      //save auth token and redirect
      localStorage.setItem("token", json.authToken);
     //props.showAlert("Logged in successfully", "success");
      setLocation('/');
    }
    else {
     // props.showAlert("Invalid Credentials", "danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='row login-page d-flex'>
      <div className="col-md-6">
        <h2 className='pb-4'>Login to continue</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label ">Email address</label>
            <input type="email" className="form-control input" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control input" id="password" name="password" value={credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn blue btn-lg" >Submit</button>
        </form>
      </div>
      <div className="col-6 login-image d-none d-md-flex align-items-center justify-content-center">
        <img src={login} alt="" />
      </div>
    </div>);
};

export default Login;