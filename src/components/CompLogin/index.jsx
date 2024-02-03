import React, { useState } from 'react'
import './style.css'
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompLogin = () => {
    const [emailAdmin,setEmailAdmin] = useState("")
const [passwordAdmin, setPasswordAdmin]=useState("")
const [loading,setLoading] = useState(false)
const [loginSucces,setLoginSucces] = useState(false)
const [loginError,setLoginError] = useState(false)
const [inputEmpty,setInputEmpty] = useState(false)
const navigate = useNavigate()

const onChangeEmail = (e) => {
    setEmailAdmin(e.target.value)
    setLoginError(false)
    setInputEmpty(false)
    setLoginSucces(false)
}

const onChangePassword = (e) => {
    setPasswordAdmin(e.target.value)
    setLoginError(false)
    setInputEmpty(false)
    setLoginSucces(false)
}

const handleLogin = async () => {
try{
    if(emailAdmin=== "" || passwordAdmin === ""){
        setInputEmpty(true)
        return
      }
const bodyPayLoad = {
email : emailAdmin,
password : passwordAdmin,
role : "admin"
}




setLoading(true);
const res = await axios.post(`https://api-car-rental.binaracademy.org/admin/auth/login`,bodyPayLoad)
console.log(res)
localStorage.setItem("response",JSON.stringify(res.data.role))
localStorage.setItem("access_token",res.data.access_token)
setLoginSucces(true)
setTimeout(() => {
  navigate("/dashboard")
}, 2000);
}catch(err){
  
    setLoginError(true)
    setLoading(false);
    console.log(err)
    
}
}
  return (
    <div className="container-form-login">
    <div className="head-formlogin d-grid gap-3">
      <Link to={"/dashboard"}>
        <div className="logo-formlogin">p</div>
      </Link>
      <div className="header-login">Welcome Back, Admin BCR</div>
      {loginError? <p className='login-error'>Email and Password Not Registered!!!</p> : null}
      {inputEmpty? <p className='login-field'>Email and Password Not Found!!!</p> : null}
        {loginSucces? <p className="login-succes">Login Succes!!!</p> : null}
      <Form className="d-grid gap-3">
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Email*</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password*</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="6+ Character"
            onChange={onChangePassword}
          />
        </Form.Group>
      </Form>
      <button
        onClick={handleLogin}
        className="btn-signIn"
        disabled={loading ? true : false}
      >
        {loading ? "...loading" : "Sign in"}

      </button>
    </div>
  </div>
  )
}

export default CompLogin