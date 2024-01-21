import {useState} from 'react'
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
      if (state.userId.trim() === '' && state.pin.trim() === '') {
        setState({
          ...state,
          error: 'User ID and PIN are required. Please enter both values.',
        })
        return
      }

      if (state.userId.trim() === '') {
        setState({
          ...state,
          error: 'User ID is required. Please enter a valid User ID.',
        })
        return
      }

      if (state.pin.trim() === '') {
        setState({
          ...state,
          error: 'PIN is required. Please enter a valid PIN.',
        })
        return
      }

      const response = await fetch('https://apis.ccbp.in/ebank/login', {
        method: 'POST',
        body: JSON.stringify({
          user_id: state.userId,
          pin: state.pin,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 1})

        history.replace('/')
      } else {
        setState({
          ...state,
          error: data.error_msg || 'Invalid credentials. Please try again.',
        })
      }
    } catch (loginError) {
      setState({
        ...state,
        error: 'An error occurred. Please try again later.',
      })
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
            onChange={e => setState({...state, userId: e.target.value})}
          />

          <label htmlFor="pin">PIN:</label>
          <input
            type="password"
            id="pin"
            value={state.pin}
            onChange={e => setState({...state, pin: e.target.value})}
          />
        </form>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
