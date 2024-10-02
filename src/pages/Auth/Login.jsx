import React, { useState } from 'react'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import { MdOutlineEmail } from "react-icons/md";
import axiosClient from '../../api/axios-client';
import { Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { FiLock } from "react-icons/fi";

const Login = () => {
  const {setUser} = useAuth();
  const [isValidate, setIsValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const {email, password} = e.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    }

    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data)
        console.log(data.token);
        // localStorage.setItem('tokem', data.token);
        navigate('/dashboard')
      })
      .catch((error) => {
        setIsValidate(true)
        setErrorMessage(error.response.data.error)
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
        <InputField
          name='email'
          type='email'
          placeholder='Email Address'
          icon={<MdOutlineEmail />}
          invalid={isValidate}
        />

        <InputField
          name='password'
          type='password'
          placeholder='Password'
          icon={<FiLock />}
          invalid={isValidate}
        />

        <Button 
          type='submit' 
          text='Login'
        />
      </form>

      <div>
        Dont have an account ? <Link className='link' to={'/registrasi'}>Registration</Link>
      </div>
    </div>
  )
}

export default Login