import React from "react"


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "./login"
import Register from "./register"
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
    <Route path="/form">
        <form action="/form" method="POST">
            <input name="1"/>
            <input name="2"/>
            <button type="submit">...</button> 
        </form>
    </Route>
    </Switch>
    </BrowserRouter>
)
}

export default App ;