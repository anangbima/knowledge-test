import React from 'react'
import { Link } from 'react-router-dom'

const Registrasi = () => {
  return (
    <div className='registrasi'>
      <div className='title'>
        Hello!
      </div>
      <div className='subttitle'>
        Sign up to get started
      </div>

      

      <div>
        Allready have an account ? <Link to={'/login'}>Login</Link>
      </div>
    </div>
  )
}

export default Registrasi