import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import { MdOutlineEmail } from "react-icons/md";
import Button from '../../components/Button';
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import axiosClient from '../../api/axios-client';
import { Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Registrasi = () => {
  const {setUser} = useAuth();
  const [isValidate, setIsValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegistrasi = async (e) => {
    e.preventDefault();

    const {name, email, password} = e.target.elements;

    const payload = {
      name : name.value,
      email : email.value,
      password : password.value
    }

    axiosClient.post('/register', payload)
      .then(({data}) => {
        setUser(data)
        navigate('/dashboard')
      })
      .catch((error) => {
        setIsValidate(true)
        setErrorMessage(error.response.data.error)
      })
  }

  return (
    <div className='registrasi'>
      <div className='title'>
        Hello!
      </div>
      <div className='subttitle'>
        Sign up to get started
      </div>

      {isValidate &&
        <div className='alert'>
          <Alert sx={{borderRadius: '30px',}} severity="error">
            {errorMessage}
          </Alert>
        </div>
      }

      <form onSubmit={handleRegistrasi} className='form-auth'>
        <InputField
          name='name'
          type='text'
          placeholder='Full Name'
          icon={<FaRegUser />}
          invalid={isValidate}
        />

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
          icon={<FiLock/>}
          invalid={isValidate}
        />

        <Button 
          type='submit' 
          text='Registrasi'
        />
      </form>

      <div>
        Allready have an account ? <Link className='link' to={'/login'}>Login</Link>
      </div>
    </div>
  )
}

export default Registrasi