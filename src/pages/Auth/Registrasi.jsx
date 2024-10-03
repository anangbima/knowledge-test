import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputIcon from '../../components/InputIcon'
import { MdOutlineEmail } from "react-icons/md";
import Button from '../../components/Button';
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import axiosAuth from '../../api/axios-user';
import { Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import axiosUser from '../../api/axios-user';

const Registrasi = () => {
  const {setUser} = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    document.title = 'Registrasi - GoFinance'
  }, [])

  const handleRegistrasi = async (e) => {
    e.preventDefault();

    emptyInput()

    const {name, email, password} = e.target.elements;

    // validate data
    if(name.value === '' || name.value === null) {
      setNameError('Name is required')
      return;
    }
    
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
      name : name.value,
      email : email.value,
      password : password.value
    }

    axiosUser.post('users', payload)
      .then(({data}) => {
        navigate('/dashboard')
        setUser(data);
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const emptyInput = () => {
    setNameError('')
    setEmailError('')
    setPasswordError('')
  }

  return (
    <div className='registrasi'>
      <div className='title'>
        Hello!
      </div>
      <div className='subttitle'>
        Sign up to get started
      </div>

      <form onSubmit={handleRegistrasi} className='form-auth'>
        <InputIcon
          name='name'
          type='text'
          placeholder='Full Name'
          icon={<FaRegUser />}
          invalid={nameError}
        />

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
          icon={<FiLock/>}
          invalid={passwordError}
        />

        <Button 
          type='submit' 
          text={isLoading == true ? <CircularProgress size={'14px'} sx={{marginTop: 0.1}} color="inherit"/> : 'Registrasi'}
        />
      </form>

      <div>
        Allready have an account ? <Link className='link' to={'/login'}>Login</Link>
      </div>
    </div>
  )
}

export default Registrasi