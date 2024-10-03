import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import InputIcon from '../../components/InputIcon'
import { MdOutlineEmail } from "react-icons/md";
import axiosAuth from '../../api/axios-auth';
import { Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { FiLock } from "react-icons/fi";
import axiosUser from '../../api/axios-user';

const Login = () => {
  const {setUser} = useAuth();
  const [isValidate, setIsValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    document.title = 'Login - GoFinance'
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    emptyInput()

    const {email, password} = e.target.elements;

    if(email.value === '' || email.value === null) {
      setEmailError('Email is required')
      return;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError('Email is not valid')
      return;
    }

    if(password.value === '' || password.value === null) {
      setPasswordError('Password is required')
      return;
    } else if (password.value.length < 6) {
      setPasswordError('Password length at least 6 char')
      return;
    }

    setIsLoading(true)

    const payload = {
      email: email.value,
      password: password.value,
    }

    axiosUser.get('users')
      .then(({data}) => {
        data.map(user => {
          if (email.value === user.email) {
            if (password.value === user.password) {
              navigate('/dashboard')
              setIsLoading(false)
              setUser(user)
            }else{
              setIsValidate(true)
              setErrorMessage('Password Incorrect')
              setIsLoading(false)
            }
          }else{
            setIsValidate(true)
            setErrorMessage('User Not Found')
            setIsLoading(false)
          }
        })
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const emptyInput = () => {
    setEmailError('')
    setPasswordError('')
  }

  return (
    <div className='login'>
      <div className='title'>
        Hello Again!
      </div>
      <div className='subttitle'>
        Welcome Back
      </div>

      {isValidate &&
        <div className='alert'>
          <Alert sx={{borderRadius: '30px',}} severity="error">
            {errorMessage}
          </Alert>
        </div>
      }

      <form onSubmit={handleLogin} className='form-auth'>
        <InputIcon
          name='email'
          type='email'
          placeholder='Email Address'
          icon={<MdOutlineEmail />}
          invalid={emailError}
        />

        <InputIcon
          name='password'
          type='password'
          placeholder='Password'
          icon={<FiLock />}
          invalid={passwordError}
        />

        <Button 
          type='submit' 
          text={isLoading == true ? <CircularProgress size={'14px'} sx={{marginTop: 0.1}} color="inherit"/> : 'Login'}
        />
      </form>

      <div>
        Dont have an account ? <Link className='link' to={'/registrasi'}>Registration</Link>
      </div>
    </div>
  )
}

export default Login