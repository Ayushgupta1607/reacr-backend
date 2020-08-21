import React, { useState,useEffect } from "react"


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from "./login"
import Register from "./register"
import axios from "axios";
import PrivateRoute from "./private"
import Profile from "./profile"

function App(){

    
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
    <PrivateRoute>
    <Route path="/profile">
        <Profile />
    </Route>
    </PrivateRoute>
      
       
    


    
    </Switch>
    </BrowserRouter>
        )
}

export default App ;
