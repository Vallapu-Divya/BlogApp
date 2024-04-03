import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab} from '@mui/material'
import { authActions } from "../store";

const Header = () => {
    const dispatch = useDispatch()
     const [value,setValue]= useState(0);
     const isLoggedIn = useSelector(state => state.isLoggedIn) 
  return (
    <AppBar 
    position="sticky"
    sx={{background : "linear-gradient(90deg, rgba(6,5,57,1) 0%, rgba(0,129,255,1) 49%, rgba(6,35,41,1) 99%)"}}>
        <Toolbar>
            <Typography variant="h4">BlogsApp</Typography>
            {isLoggedIn  && <Box display ="flex" marginLeft={'auto'} marginRight={'auto'}>
                <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>   
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>  
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft='auto'>
            {!isLoggedIn && <Button   LinkComponent={Link} to="/Auth" variant ='contained' sx={{margin :'1',borderRadius:10}} color="warning">Login</Button>}
            {!isLoggedIn && <Button LinkComponent={Link} to="/Auth" variant ='contained' sx={{margin :'1',borderRadius:10}} color="warning">Signup</Button>}
                {isLoggedIn && <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to="/Auth" variant ='contained' sx={{margin :'1',borderRadius:10}} color="warning">Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header 