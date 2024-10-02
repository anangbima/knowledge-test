import React from 'react'
import { Link } from 'react-router-dom'
import InputField from '../../components/InputField'
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Button from '../../components/Button';

const Registrasi = () => {

  const handleRegistrasi = async (e) => {
    e.preventDefault();

    const {name, email, password} = e.target.element;

    const payload = {
      name : name.value,
      email : email.value,
      password : password.value
    }
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
        <InputField
          name='name'
          type='text'
          placeholder='Full Name'
          icon={<FaUser />}
        />

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
          text='Registrasi'
        />
      </form>

      <div>
        Allready have an account ? <Link to={'/login'}>Login</Link>
      </div>
    </div>
  )
}

export default Registrasi