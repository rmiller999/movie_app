import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Main from './components/Main';
import {
  Link
} from 'react-router-dom';

function Login({liftToken, onLoginClick, user,changeTitle}) {
  let history = useHistory();
  const [state, setState] = useState({

      email: '',
      password: '',
      message: ''
  })

  

  async function handleEmailChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value}
    })
  }

  async function handlePasswordChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value}
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/login', {
      email: state.email,
      password: state.password
    }).then(res => {
      if (res.data.type === 'error') {
        setState(prevState => {
          return {...prevState, message: res.data.message}
        })
      } else {
        localStorage.setItem('mernToken', res.data.token)
        // window.location.reload(false)
        liftToken(res.data)
        history.push('/');
        changeTitle()
      }
    }).catch(err => {
      setState(prevState => {
        return {...prevState, message: 'Max login attempts exceeded. Please try again later.'}
      })
    })
  }

  async function closeLogin() {
    history.push('/')
  }
  // // var title = document.getElementsByTagName('title');
  // // title.innerHtml = state.user.name+"'s Movies.DB"
  // document.title = state.user.name+"'s Movies.DB";

    return (
      <>
      {/* <NavBar user={user} /> */}
      <Main />
      <section className="popup">
        <div id="loginPopup" className="content">
          <div className="Login">
            <h3>Log into your account</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input onChange={handleEmailChange}
                      type="email"
                      value={state.email}
                      name="email"
                      placeholder="Enter email..."
                      className="emailInput"
                      /><br />
              <label htmlFor="password">Password:</label>
              <input onChange={handlePasswordChange}
                      type="password"
                      value={state.password}
                      name="password"
                      className="passwordInput"
                      placeholder="Enter password..." />
              <input className="submitForm" type="submit" value="Log in!" />
              <Link className="noAcct" to='/signup'  >Don't have an account?</Link>
            </form>
          </div>
          <button  className="close" onClick={closeLogin}>back</button>
        </div>
      </section>
    </>
    );
  
}

export default Login;