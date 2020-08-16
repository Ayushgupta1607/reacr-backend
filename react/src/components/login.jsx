import React from "react";
import "../loginStyle.css"
function Login(){
    return (
    <div className="container login">
    <form action="/login" method="POST" className="form-signin">
    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label htmlFor="inputEmail">Email</label>
    <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
    <label htmlFor="inputPassword">Password</label>
    <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  </form>
  </div>
  )
}

export default Login;



// {/* <div className="checkbox mb-3">
//   <label >
//     <input type="checkbox" value="remember-me" />
//   <text>remember me</text>  
//   </label>
// </div> */}