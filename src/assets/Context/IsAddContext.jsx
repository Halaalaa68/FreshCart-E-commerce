import React, { createContext, useState } from "react";

export let IsAddContext= createContext();

export default function IsAddContextProvider(props){
    const [isAdd, setisAdd] = useState([])
    // setToken('hi')
    return <IsAddContext.Provider value={{isAdd, setisAdd}}>
            {props.children}
        </IsAddContext.Provider>

}