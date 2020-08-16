import React, { useState } from "react";
import axios from "axios";


import "../registerStyle.css"
function Register(){  

  const [registerInput,setRegisterInput]=useState({
    email:"",
    password:"",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setRegisterInput(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
    
  }
    async function register(){
      
      await axios.post('/register', {
        registerInput
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        
        console.log(error);
      });
      console.log(registerInput);
    }
    
  

    return (
    <div className="container-fluid register">
    <form onSubmit={register} className="form-signup">
    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
    {/* <label htmlFor="inputFName">First Name</label>
    <input type="text" name="fName" id="inputFName" className="form-control" placeholder="First Name" required autoFocus/>
    <label htmlFor="inputLName">Last Name</label>
    <input type="text" name="lName" id="inputLName" className="form-control" placeholder="Last Name" required /> */}
    <label htmlFor="inputEmail">Email</label>
    <input type="email" onChange={handleChange} name="email" id="inputEmail" className="form-control" placeholder="Email address" value={registerInput.email} required  />
    <label htmlFor="inputPassword">Password</label>
    <input type="password" onChange={handleChange} name="password" id="inputPassword" className="form-control" placeholder="Password" value={registerInput.password} required />
    {/* <label htmlFor="confirmPassword">Confirm Password</label>
    <input type="password" name="cPassword" id="confirmPassword" className="form-control" placeholder="Password" required /> */}
    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
  </form>
  </div>
  )
}

export default Register;

