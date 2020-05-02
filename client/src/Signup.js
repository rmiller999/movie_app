import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Main from './components/Main';

function Signup({closePopup, liftToken}) {
  let history = useHistory();
  const [state, setState] = useState({
      name: '',
      email: '',
      password: '',
      message: ''
  })
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name] : value}
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/auth/signup', {
      name: state.name,
      email: state.email,
      password: state.password
    }).then(res => {
      console.log(res)
      if (res.data.type === 'error') {
        setState(prevState => {
          return {...prevState, name: '', email: '', password: '', message: res.data.message}
        })
      } else {
        localStorage.setItem('mernToken', res.data.token)
        liftToken(res.data)
        history.push('/');
      }
    // }).catch(err => {
    //   console.log(err)
    //   setState(prevState => {
    //     return {...prevState, message: 'Max accounts exceeded. Try again later.'}
    //   })
    })
  }

  async function closeSignup() {
    history.push('/')
  }

    return (
      <>
      {/* <NavBar /> */}
      <Main />
      <section className="popup">
        <div id="signupPopup" className="content">
          <div className="Signup">
            <h3>Create a new account</h3>
            <form onSubmit={handleSubmit}>
              {/* <label htmlFor="name">Name:</label> */}
              <input onChange={handleInputChange}
                      value={state.name}
                      type="text"
                      name="name"
                      className="nameInput"
                      placeholder="Enter name..."/><br />
              {/* <label htmlFor="email">Email:</label> */}
              <input onChange={handleInputChange}
                      value={state.email}
                      type="email"
                      name="email"
                      className="emailInput"
                      placeholder="Enter email..."/><br />
              {/* <label htmlFor="password">Password:</label> */}
              <input onChange={handleInputChange}
                      value={state.password}
                      type="password"
                      name="password"
                      className="passwordInput"
                      placeholder="Choose a password"/><br />
              <input id="signupSubmit" className="submitForm" type="submit" value="Sign up"/>
              <p className='error'>{state.message}</p>
            </form>
          </div>
          <button className="close" onClick={closeSignup}>back</button>
        </div>
      </section>
    </>
    );
  
}

export default Signup;