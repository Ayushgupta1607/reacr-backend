import React, { useState,useEffect } from "react"


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from "./login"
import Register from "./register"
import axios from "axios";
import PrivateRoute from "./private"
import Profile from "./profile"

function App(){

    const [isLoggedIn,setIsLoggedIn]=useState(false);

    const verify =async ()=>{ 
        const componentMounted=true;
        // if(componentMounted){
        // setIsLoggedIn(true);}
        await axios.get("/api")
        .then((res)=>{
            console.log(res);
            const isVerified=res.data.isVerified;
            console.log(isVerified)
            if(componentMounted){
            setIsLoggedIn(isVerified);
            

        }
        }
            )
            .catch((err)=>console.log(err));
            // console.log(isLoggedIn);
         }
 useEffect(
    ()=>{  
        verify();
    }
     ,[]
)
console.log(isLoggedIn);
        return (
    <BrowserRouter>
    {/* <Navbar /> */}
    <Switch>
    <Route exact path="/">hey</Route>
    <Route path="/login" >
        <Login />
    </Route>
    <Route path="/register">
        <Register />
    </Route>
    <PrivateRoute path="/profile" log={isLoggedIn} component={Profile}/>
      
      
       
    


    
    </Switch>
    </BrowserRouter>
        )
}

export default App ;