import React, { createContext, useState } from "react";

export let CartContext= createContext();

export default function CartContextProvider(props){
    const [Cart, setCart] = useState([])
    const [CartId, setCartId] = useState(0)
    const [CartOwner, setCartOwner] = useState(0)
    const [Search, setSearch] = useState('')
    const [NumofCart, setNumofCart] = useState(localStorage.getItem('NumofCart'))
    // setToken('hi')
    return <CartContext.Provider value={{Cart, setCart, CartId, setCartId, CartOwner, setCartOwner, NumofCart, setNumofCart, Search, setSearch}}>
            {props.children}
        </CartContext.Provider>

}