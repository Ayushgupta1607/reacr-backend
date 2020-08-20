import React, { useEffect, useState } from "react";
import { Route,Redirect } from "react-router-dom";
import axios from "axios";




function PrivateRoute({component: Component,...rest}){
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const verify = async ()=>{
        const componentMounted=true;
//         if(componentMounted){
//         setIsLoggedIn(true);}
        await axios.get("/api")
        .then((res)=>{
            console.log(res);
            const isVerified=res.data.isVerified;
            console.log(isVerified)
            if(componentMounted){
            setIsLoggedIn(isVerified);}
        }
            )
            .catch((err)=>console.log(err));
            console.log(isLoggedIn);
         }
 useEffect(
    ()=>{  
        verify();
    console.log(isLoggedIn)}
     ,[]
)



return (
<Route {...rest} render={
    (props)=>
   isLoggedIn?
    <Component {...props}/>:
    <Redirect to="/login"/>
    }  

    />
    )

}

export default PrivateRoute;
