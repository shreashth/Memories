import React, { useState } from 'react';
import { TextField, Paper, Avatar, Container, Grid, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/authentication'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {

    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState(initialState)

    const dispatch = useDispatch();

    const history = useHistory();

    const authReducer = useSelector((state)=> state.authReducer)

    const authMessage = authReducer.authMessage

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignUp){

            dispatch(signup(formData,history))

        }else{
            
            dispatch(signin(formData,history))

        }



    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        
    }
    
    const switchMode = () => {
        setIsSignUp((prev) => !prev)
        setShowPassword(false);

    }


    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }


    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId


        try {

            dispatch({ type: 'AUTH', payload:{ result, token } })

        } catch (error) {


        }

    }

    const googleFailure = (error) => {

        console.log('Google Sign In is Unsuccessfull. Sign In later')

    }



    const classes = useStyles();



    return (
        <>
            <Container component="main" maxWidth="xs">
                { authMessage && (
                    <Paper className={classes.errorpaper} elevation={3}>

                        <Typography variant="h5" color="error">{authMessage.message}</Typography>

                    </Paper>

                )}

                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus xs={6} />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus xs={6} />
                                    </>
                                )
                            }

                            <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
                            <Input name='password' label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} type={showPassword ? 'text' : 'password'} />

                            {isSignUp && <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} />}


                        </Grid>



                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>

                        <GoogleLogin
                            clientId="504733155171-su368kcid3ovma86ro0csa0l8bpv6ti6.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className={classes.googleButton}
                                    color="primary"
                                    fullWidth
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant='contained' >Google Sign In</Button>
                            )}

                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy='single_host_origin'
                        />


                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an Account? Sign In' : "Don't have a  Account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                </Paper>


            </Container>
        </>

    )
}

export default Auth;
