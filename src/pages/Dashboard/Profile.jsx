import React, { useEffect } from 'react'
import Header from '../../components/Header'
import { useAuth } from '../../context/AuthContext'
import { FaRegCircleUser } from "react-icons/fa6";

const Profile = () => {
  const {user} = useAuth(); //mengambil dari localstorage

  useEffect(() => {
    document.title = 'Profile - GoFinance'
  }, [])

  return (
    <div>
      <Header page='Profile'/>

      <div className='content profile'>
        <div className='image-wrap'>
          <div className='image'>
            <FaRegCircleUser />
          </div>
        </div>
        <div className='bio'>
          <div className='bio-wrap'>
            <div className='label'>
              Name
            </div>
            <div className='data'>
              {user.name}
            </div>
          </div>

          <div className='bio-wrap'>
            <div className='label'>
              Email
            </div>
            <div className='data'>
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile