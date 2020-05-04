import React from 'react'
import {
  Link
} from 'react-router-dom';

function NavBar({user, liftToken, closePopup, logout}) {

  async function themeChange() {
    // e.preventDefault();
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass === "light-mode" ? "dark-mode" : "light-mode";
  }

  // var user = user
  var contents
  if (user) {
    contents = (
      <>
        <p className="navTitle"><span>{user.name}'s</span> Movie<span className="titlePeriod">.</span><span>DB</span></p>
        <div className="navbuttons">
            <button className="logout" onClick={logout}>Logout</button>
            <p className="userName">Welcome, ({user.name})</p>
        </div>
      </>
    );
  } else {
    contents = (
      <>
      <p className="navTitle"><span>My </span>Movie<span className="titlePeriod">.</span><span>DB</span></p>
        <div className="navbuttons">
          <Link className="login" to='/login'  >Login</Link>
          <Link className="signup" to='/signup'  >Sign Up</Link>
        </div>
      </>
    )
  }


  return (
    <nav className="navbar">
      <input onChange={themeChange} type="checkbox" id="toggle" className="checkbox" />  
      <label htmlFor="toggle" className="switch"></label>
      {/* <input onClick={themeChange} type="checkbox" id="switch" />
      <label for="switch">Toggle</label> */}
      {contents}
    </nav>
  )
}

export default NavBar
