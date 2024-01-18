import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'

const App = () => (
  <Router>
    <Switch>
      <Route path="/ebank/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect from="/" to="/home" exact />
      <Redirect to="/not-found" />
    </Switch>
  </Router>
)

export default App
