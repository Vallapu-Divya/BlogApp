import React, { useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Typography,Box,Button,TextField} from '@mui/material'
import axios from 'axios';
import { authActions } from "../store";

import { useNavigate } from "react-router-dom";



const Auth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const history = useNavigate()


  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
});

const [isSignup, setIsSignup] = useState(false);


const handleChange = (e) => {
  setInputs((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value
      
  }))
}



/*const sendRequest = async (type="login") => {
  //const res = await axios.post(`https://mern-blog-app-2022.herokuapp.com/api/user/${type}`, { 
 const res = await axios
  .post(`http://localhost:5000/api/user/${type}`, {
  name:inputs.name,
  email : inputs.email,
  password : inputs.password
 
}) 
.catch((err) => dispatch(authActions.signInFailure(err.message)))

const data = await res?.data;


console.log(data);
return data
}

const sendRequest = async (type = 'login') => {
  const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
    name: inputs.name,
    email: inputs.email,
    password: inputs.password
  }).catch((err) => {
    if (err.response.status === 400 && err.response.data.message === 'User already exists') {
      alert('User already exists. Please login.');
      navigate("/"); // Navigate to the login page
    } else {
      dispatch(authActions.signInFailure(err.message)); // Dispatch signInFailure action for other errors
    }
  });

  const data = await res?.data;
  console.log(data);
  return data;
};

const handleSubmit = (e) => {
  e.preventDefault()
  console.log(inputs)

  if (!inputs.email || !inputs.password) {
    // return dispatch(authActions.signInFailure());
    return dispatch(authActions.signInFailure(alert('Please fill all the fields'))) // Dispatch validation error action
    //throw new Error('Please fill all the fields');
      
  }


  if (isSignup && !inputs.name) {
    return dispatch(authActions.signInFailure(alert('Name is required for signup'))); // Dispatch validation error action
   //return
  }

if(isSignup){
    sendRequest("signup") 
    .then((data) =>localStorage.setItem("userId", data?.user?._id))
    .then(() => dispatch(authActions.login()))
    .then(() => navigate("/blogs"))
    
  }
else {
    sendRequest().then((data) => localStorage.setItem("userId", data?.user?._id))
    .then(() => dispatch(authActions.login()) )
    .then(() => navigate("/blogs"))
  }
  

}  */

const sendRequest = async (type = 'login') => {
  try {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    });

    const data = res?.data;
    console.log(data); // Check response data in the console

    if (type === 'signup') {
      localStorage.setItem("userId", data?.user?._id);
      dispatch(authActions.login())
     navigate("/blogs")
    }

    return data;
  } catch (err) {
    if (err.response && err.response.status === 400 && err.response.data.message === 'User already exists') {
      alert('User already exists. Please login.');
      return null; // Return null to indicate user exists
    } else if (err.response && err.response.status === 400 && err.response.data.message === 'Incorrect Password') {
      alert('Incorrect password. Please enter the correct password.');
      return null; // Return null to indicate incorrect password
    }
     else {
      dispatch(authActions.signInFailure(err.message));
      return null; // Return null for other errors
    }

  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!inputs.email || !inputs.password) {
    return dispatch(authActions.signInFailure(alert('Please fill all the fields')));
  }

  if (isSignup && !inputs.name) {
    return dispatch(authActions.signInFailure(alert('Name is required for signup')));
  }

  const data = await sendRequest(isSignup ? 'signup' : 'login');

  if (data) {
    if (isSignup) {
      navigate("/Auth"); // Navigate to the login page after successful signup
    } else {
      localStorage.setItem("userId", data?.user?._id);
      dispatch(authActions.login());
      navigate("/blogs"); // Navigate to the blogs page after successful login
    }
  }
};


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
       {isSignup && (<TextField name="name" onChange={handleChange} value= {inputs.name} placeholder="Name" margin="normal" />)}
        < TextField name="email"  onChange={handleChange} value= {inputs.email}  type={'email'} placeholder="Email" margin="normal"/>
        < TextField name="password" onChange={handleChange} value= {inputs.password}  type={'password'} placeholder="Password" margin="normal"/>
      
        <Button type ='submit' variant="contained" sx={{borderRadius:3, marginTop:3}} color="warning">Submit</Button>
        <Button onClick={()=> setIsSignup(!isSignup)}sx={{borderRadius:3, marginTop:3}}>
          Change To { isSignup ? "LogIn" : "Sign Up"} </Button>
          

      </Box>

      </form>

    </div>

  
  ); 

  }

export default Auth;