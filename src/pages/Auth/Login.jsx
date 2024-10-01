import React from 'react'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='login'>
      <div className='title'>
        Hello Again!
      </div>
      <div className='subttitle'>
        Welcome Back
      </div>


      <Button text={'Login'}/>

      <div>
        Dont have an account ? <Link to={'/registrasi'}>Registration</Link>
      </div>
    </div>
  )
}

export default Login