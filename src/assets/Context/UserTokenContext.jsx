import React, { createContext, useState } from "react";

export let UserTokenContext= createContext();

export default function UserTokenContextProvider(props){
    const [token, setToken] = useState(localStorage.getItem('userToken'))
    const [name, setname] = useState(localStorage.getItem('name'))
    // setToken('hi')
    return <UserTokenContext.Provider value={{token, setToken, name,setname}}>
            {props.children}
        </UserTokenContext.Provider>

}