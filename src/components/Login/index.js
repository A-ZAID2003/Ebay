import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const history = useHistory()

  const [state, setState] = useState({
    userId: '',
    pin: '',
    error: '',
  })

  const handleLogin = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ebank/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: state.userId,
          pin: state.pin,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Successful login
        // Save JWT token to cookies with an expiration of 1 day (adjust as needed)
        Cookies.set('jwt_token', data.jwt_token, {expires: 1})

        // Redirect to Home Route
        history.replace('/')
      } else {
        // Login failed
        setState(prevState => ({
          ...prevState,
          error: data.error_msg || 'Invalid credentials. Please try again.',
        }))
      }
    } catch (loginError) {
      // Handle other errors
      setState(prevState => ({
        ...prevState,
        error: 'An error occurred. Please try again later.',
      }))
    }
  }
  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
        alt="website login"
      />
      <h1>Welcome Back</h1>
      {state.error && <p style={{color: 'red'}}>{state.error}</p>}
      <div>
        <form>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={state.userId}
            onChange={e =>
              setState(prevState => ({...prevState, userId: e.target.value}))
            }
          />

          <label htmlFor="pin">PIN:</label>
          <input
            type="password"
            id="pin"
            value={state.pin}
            onChange={e =>
              setState(prevState => ({...prevState, pin: e.target.value}))
            }
          />
        </form>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
