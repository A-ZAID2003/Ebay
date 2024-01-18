import React from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
  const history = useHistory()

  const handleLogout = () => {
    // For simplicity, clear any authentication-related data
    // and navigate to the Login Route
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
        alt="website logo"
      />
      <h1>Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
