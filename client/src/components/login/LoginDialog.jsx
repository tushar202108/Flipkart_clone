
import { Dialog, Box, TextField, Typography, Button, styled } from '@mui/material';

import { useState, useContext } from 'react';

import { authenticateSignup, authenticateLogin } from '../../service/api';

import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    height:80vh;
    width:90vh;
`;

const Image = styled(Box)`
   background:#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
   height:103%;
   width:33%;
   padding:45px 35px;
   & > p, & > h5 {
      color:#FFFFFF;
   }
`;

const Wrapper = styled(Box)`
  display:flex;
  flex-direction:column;
  padding:25px 35px;
  flex:1;
  & > div, & > button, & > p{
  margin-top:20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform:none;
  text-align:center;
  background:#FB641B;
  color:#fff;
  height:48px;
  border-radius:2px;
`;

const RequestOTP = styled(Button)`
  text-transform:none;
  text-align:center;
  background:#fff;
  color:#2874f0;
  height:48px;
  border-radius:2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
   font-size:12px;
   color:#878787;
`;

const CreateAccount = styled(Typography)`
    text-align:center;
    font-size:12px;
    cursor:pointer;
    color:#2874f0;
    font-weight:600;
`;

const Error = styled(Typography)`
     font-size:10px;
     color:#ff6161;
     line-height: 0;
     margin-top:10px;
     font-weight:600;
`;

const accountInitialValues = {
    login: {
        view:'login',
        heading:'login',
        subHeading:'Get access to your order, wishlist and recommendation'    
    },
    signup: {
        view:'signup',
        heading:'Looks like you are new here',
        subHeading:'Sign up with the mobile number to get started'
    }
}

const signupInitialValues = {
    firstName: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
   username:'',
   password:''
}

const LoginDialog = ({ open, setOpen }) => {

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup,setSignup] = useState(signupInitialValues.signup);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);
    

    const {setAccount}= useContext(DataContext);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e) => {
        setSignup({...signup,[e.target.name]: e.target.value});
    }

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if(!response)return;
        handleClose();
        setAccount(signup.firstName)
    }

    const onValueChange = (e) => {
        setLogin({...login,[e.target.name]:e.target.value })
    }

    const loginUser = async () =>  {
        let response = await authenticateLogin(login);
        console.log(response);
        if (response.status === 200){
            handleClose();
            setAccount(response.data.data.firstName)
        } else {
             setError(true);
        }
    }


    return(
        <Dialog open={ open } onClose={handleClose} PaperProps={{ sx: {maxWidth:'unset'}}}>
            <Component>
                <Box style = {{display: 'flex', height:'80%'}}>
                <Image>
                    <Typography variant='h5'>{account.heading}</Typography>
                    <Typography style={ {marginTop: 20} }>{account.subHeading}</Typography>
                </Image>
                { 
                account.view === 'login' ?
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => {onValueChange(e)}} name='username' label="Enter username"/>
                    {error && <Error>Please enter valid username or password</Error>}
                    <TextField variant="standard" onChange={(e) => {onValueChange(e)}} name='password' label="Enter the password"/>
                    <Text>"By continuing you agree to flipkart's terms and policy"</Text> 
                    <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                    <Typography style={{ textAlign:'center'}}>OR</Typography>
                    <RequestOTP>Request OTP</RequestOTP>
                    <CreateAccount onClick={() => toggleSignup()}>New to flipkart? Create an account</CreateAccount>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='firstName' label="Enter firstname"/>
                    <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='lastname'  label="Enter lastname"/>
                    <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='username'  label="Enter username"/>
                    <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='email'     label="Enter email"/>
                    <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='password'  label="Enter the password"/>
                    <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='phone'     label="Enter phone"/>
                    <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                </Wrapper>
                }
            </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;