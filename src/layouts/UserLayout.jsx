import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from '../context/AuthContext';

const UserLayout = () => {
  const {user} = useAuth();

  if(!user) {
    return <Navigate to='/login'/>
  }

  return (
    <div className='user-layout'>
      <div className='navbar'>
        <div className='container'>
          <div className='nav-content'>
            <div className='icon'>
              <FaRegCircleUser />
            </div>

            <div>
              <div className='username'>
                JASON LEE L.W
              </div>
              <div className='title'>
                Sales Lead
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLayout