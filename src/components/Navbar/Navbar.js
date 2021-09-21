import React,{ useEffect, useState } from 'react'
import { Toolbar, Avatar, Container , AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.jpg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

    const authData = useSelector((state) => state.authReducer.authData)

    const classes = useStyles();

    const dispatch = useDispatch();

    const history = useHistory();

    const location = useLocation();

    const  [user,setUser] = useState(null);
   
    useEffect(()=>{

       setUser(JSON.parse(localStorage.getItem('profile')));

    
       history.push('/')

    
    },[authData])

    


    const logout =() =>{
        
        dispatch({type:'LOGOUT'})
      
       history.push('/')
       
       setUser(null)
    }

    
    const userName =(name)=>{
        
    let namearray= name.split(" ").map((xname)=> xname.charAt(0).toUpperCase() + xname.slice(1))
        
         return [namearray[0] +' '+ namearray[1]]      
    } 


    return (
        <AppBar className={classes.appBar} position = "static" color="inherit">
            <div className={classes.brandContainer}>


                <Typography component={Link} to="/" className={classes.heading} variant ="h2" align="center">Memories</Typography>
                <img src={memories} className={classes.image} alt="memories" height="60"  width="100"/>

            </div>    
            <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{ userName(user.result.name)}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
                </div>

            ):(

                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}



            </Toolbar>

            </AppBar>
    )
}

export default Navbar;
