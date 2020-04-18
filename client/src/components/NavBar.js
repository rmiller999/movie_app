import React from 'react'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

function NavBar({user, liftToken, closePopup, logout}) {
  // var user = user
  var contents
  if (user) {
    
    contents = (
      <>
        <p className="navTitle"><span>{user.name}'s</span> Movies.DB</p>
        <div className="navbuttons">
            <button className="logout" onClick={logout}>Logout</button>
            <p className="userName">Welcome, ({user.name})</p>
        </div>
      </>
    );
  } else {
    contents = (
      <>
      <p className="navTitle"><span>My </span>Movies.DB</p>
        <div className="navbuttons">
          <Link className="login" to='/login'  >Login</Link>
          <Link className="signup" to='/signup'  >Sign Up</Link>
        </div>
      </>
    )
  }


  return (
    <nav className="navbar">
      {contents}
    </nav>
  )
}

export default NavBar
