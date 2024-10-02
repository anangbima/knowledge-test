import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from '../context/AuthContext';
import { Menu, MenuItem } from '@mui/material';
import axiosClient from '../api/axios-client';

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

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem('user');
    window.location.reload()
    navigate('/')
  };

  if(!user) {
    return <Navigate to='/login'/>
  }

  return (
    <div className='user-layout'>
      <div className='navbar'>
        <div className='container'>
          <div className='nav-content' onClick={handleClick}>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
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