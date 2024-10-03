import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from '../context/AuthContext';
import { Menu, MenuItem } from '@mui/material';

const UserLayout = () => {
  const {user} = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle logout
  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('user');
    window.location.reload()
    navigate('/')
  };

  // handle klik profile
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile')
  }

  // 
  if(!user) {
    return <Navigate to='/login'/>
  }

  return (
    // layout untuk halaman user
    <div className='user-layout'>
      <div className='navbar'>
        <div className='container'>
          <div className='nav-content' onClick={handleClick}>
            <div className='icon'>
              <FaRegCircleUser />
            </div>

            <div>
              <div className='username'>
                {user.name}
              </div>
              <div className='title'>
                Sales Lead
              </div>
            </div>
          </div>

          <Menu
            className='menu'
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>

      <div className='container'>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLayout