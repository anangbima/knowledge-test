import React from 'react'
import { Outlet } from 'react-router'
import Button from '../components/Button'

const AuthLayout = () => {
  return (
    <div className='auth-layout'>
      {/* Left Content */}
      <div className='left'>
        <div className='content'>
          <div className='title'>
            GoFinance
          </div>
          <div className='subtitle'>
            Lorem ipsum dolor sit amet.
          </div>
          
          <Button 
            type='link' 
            to='/registrasi' 
            text='Read Me'
          />
        </div>

        <div className='eclipse e-1'></div>
        <div className='eclipse e-2'></div>
      </div>

      {/* Right Content */}
      <div className='right'>
        <div className='content'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout