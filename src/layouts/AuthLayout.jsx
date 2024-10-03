import React from 'react'
import { Navigate, Outlet } from 'react-router'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

const AuthLayout = () => {
  const {user} = useAuth()

  if (user) {
    return <Navigate to='/dashboard'/>
  }

  return (
    // layout untuk halaman authentikasi
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