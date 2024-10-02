import React from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import InputField from '../../components/InputField'
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Login = () => {

  const handleLogin = async (e) => {
    e.preventDefault();

    const {email, password} = e.target.element;

    const payload = {
      email: email.value,
      password: password.value,
    }


  }

  return (
    <div className='login'>
      <div className='title'>
        Hello Again!
      </div>
      <div className='subttitle'>
        Welcome Back
      </div>

      <form onSubmit={handleLogin} className='form-auth'>
        <InputField
          name='email'
          type='email'
          placeholder='Email Address'
          icon={<MdOutlineEmail />}
        />

        <InputField
          name='password'
          type='password'
          placeholder='Password'
          icon={<FaLock />}
        />

        <Button 
          type='submit' 
          text='Login'
        />
      </form>

      <div>
        Dont have an account ? <Link to={'/registrasi'}>Registration</Link>
      </div>
    </div>
  )
}

export default Login