import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import Main from './components/Main';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const API_KEY = process.env.REACT_APP_KEY;

function App() {

  const [state, setState] = useState({
      token: '',
      user: null,
      errorMessage: '',
      apiData: null,
      showLogin: false,
      showSignUp: false
  })

  const checkForLocalToken = () =>  {
    var token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // token is invalid or missing
      localStorage.removeItem('mernToken');
      setState(prevState => {
      return {...prevState, token: '', user: null}
    })
    } else {
      // we found a token in localStorage, verify it
      axios.post('/auth/me/from/token', {token})
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            setState(prevState => {
              return {...prevState, token: '', user: null, errorMessage: res.data.message}
            })
          } else {
            localStorage.setItem('mernToken', res.data.token);
            setState(prevState => {
              return {...prevState, token: res.data.token, user: res.data.user, errorMessage: ''}
            })
          }
        })
    }
  }

  const liftToken = ({token, user}) => {
    setState(prevState => {
      return {...prevState, token: token, user: user}
    })

  }

  const logout = () => {
    // remove token from localStorage
    localStorage.removeItem('mernToken');
    // remove user and token from state
    setState(prevState => {
      return {...prevState, token: '', user: null}
    })

  }

  const onLoginClick = () => {
    setState(prevState => {
      return {...prevState, showLogin: true}
    })
  }

  const closePopup = () => {
    setState(prevState => {
      return {...prevState, showLogin: false, showSignUp: false}
    });
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove("noscroll")
  }
  var mainContent = (
    <Route exact path='/' render={() => (
      <>
        {/* <NavBar onLoginClick={onLoginClick} user={state.user} liftToken={liftToken} closePopup={closePopup} logout={logout} /> */}
        <Main liftToken={liftToken} user={state.user} />
      </>
    )} />
  )

  useEffect(() => {
    checkForLocalToken()
  },[] )
  return (
    <Router>
      <NavBar onLoginClick={onLoginClick} user={state.user} liftToken={liftToken} closePopup={closePopup} logout={logout} />
      <Route exact path="/login" render={() => (
        <Login user={state.user} liftToken={liftToken} closePopup={closePopup} onLoginClick={onLoginClick}/>
        )} />
      <Route exact path="/signup" render={() => (
        <Signup user={state.user} liftToken={liftToken} closePopup={closePopup}/>
        )} />
        {mainContent}
    </Router>
  );
}
export default App;