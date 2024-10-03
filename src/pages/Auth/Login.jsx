import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import InputIcon from '../../components/InputIcon'
import { MdOutlineEmail } from "react-icons/md";
import axiosAuth from '../../api/axios-auth';
import { Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { FiLock } from "react-icons/fi";

const Login = () => {
  const {setUser} = useAuth();
  const [isValidate, setIsValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login - GoFinance'
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    const {email, password} = e.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    }

    axiosAuth.post('/login', payload)
      .then(({data}) => {
        setUser(data)
        console.log(data.token);
        // localStorage.setItem('tokem', data.token);
        navigate('/dashboard')
      })
      .catch((error) => {
        setIsValidate(true)
        setErrorMessage(error.response.data.error)
        setIsLoading(false)
      })
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
          invalid={isValidate}
        />

        <InputIcon
          name='password'
          type='password'
          placeholder='Password'
          icon={<FiLock />}
          invalid={isValidate}
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