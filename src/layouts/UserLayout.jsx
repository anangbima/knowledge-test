import React from 'react'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <div className='user-layout'>
      <div className='navbar'>
        <div className='container'>
          <div className='nav-content'>
            Username
          </div>
        </div>
      </div>

      <div className='content container'>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLayout