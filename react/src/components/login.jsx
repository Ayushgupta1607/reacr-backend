import React,{useState} from "react";
import axios from "axios"
import "../loginStyle.css"
import {useHistory} from "react-router-dom";
function Login(){

  const [loginInput,setLoginInput]=useState({
    email:"",
    password:"",
  });
  const history=useHistory();

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginInput(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  
  }

  const login = (event) => {
      
    console.log(loginInput);
    axios({
      method: "POST",
      data: {
        username: loginInput.email,
        password: loginInput.password,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => {console.log(res);
      history.push("/");
    }
      ).catch(function (error) {
      
      console.log(error);
    });
    
  
    event.preventDefault();
  };

    return (
    <div className="container login">
    <form onSubmit={login} className="form-signin">
    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label htmlFor="inputEmail">Email</label>
    <input onChange={handleChange} type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
    <label htmlFor="inputPassword">Password</label>
    <input onChange={handleChange} type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
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