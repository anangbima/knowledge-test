import React, { useEffect } from 'react'
import Header from '../../components/Header'

const Profile = () => {

  useEffect(() => {
    document.title = 'Profile - GoFinance'
  }, [])

  return (
    <div>
      <Header page='Profile'/>
    </div>
  )
}

export default Profile