import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {Typography,Box,Button,TextField} from '@mui/material'
import axios from 'axios';
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";



const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
})

const handleChange = (e) => {
  setInputs((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
      
  }))
} 

const sendRequest = async (type="login") => {
  /* const res = await axios.post(`https://mern-blog-app-2022.herokuapp.com/api/user/${type}`, { */
  const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
  name:inputs.name,
  email : inputs.email,
  password : inputs.password
}).catch((err) => console.log(err));

const data = await res.data
console.log(data)
return data

}

const handleSubmit = (e) => {
  e.preventDefault()
  console.log(inputs)
  if (isSignup){
    sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id))
    .then(() => { dispatch(authActions.login())}).then(() => navigate("/blogs"))
    .then(data => console.log(data))
}
else {
    sendRequest().then((data) => localStorage.setItem("userId", data.user._id))
    .then(() => { dispatch(authActions.login()) }).then(() => navigate("/blogs"))
    .then(data => console.log(data))
}
  
}
  const [isSignup, setisSignup] = useState(false)
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Box 
      maxWidth={400}
      display="flex" 
      flexDirection={'column'} 
      alignItems='center' 
      justifyContent={'center'}
      boxShadow="10px 10px 20px #ccc"
      padding={3}
      margin='auto'
      marginTop={5}
      borderRadius={5}>
        <Typography variant="h2" padding={3} textAlign="center">
        { isSignup ? "Sign Up" : "Login"}  
        </Typography>
       {isSignup && <TextField name="name"  onChange={handleChange} value= {inputs.name} placeholder="Name" margin="normal" />}
        <TextField name="email"  onChange={handleChange} value= {inputs.email}  type={'email'} placeholder="Email" margin="normal"/>
        <TextField name="password" onChange={handleChange} value= {inputs.password}  type={'password'} placeholder="Password" margin="normal"/>
        <Button type ='submit' variant="contained" sx={{borderRadius:3, marginTop:3}} color="warning">Submit</Button>
        <Button onClick={()=> setisSignup(!isSignup)}sx={{borderRadius:3, marginTop:3}}>
          Change To { isSignup ? "LogIn" : "Sign Up"} </Button>

      </Box>

      </form>

    </div>
  ) 
}

export default Auth;