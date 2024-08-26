import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { CartContext } from '../../assets/Context/CartContext/CartContext'
export default function Btn({id, postCart}) {
  let {Cart, setCart}= useContext(CartContext)
  // console.log(Cart)
  let x= Cart?.find((element)=> element.product.id==id)
  // console.log(x)
  // console.log(Cart)
  return (
    <button onClick={()=>postCart(id)} key={id} className={`${x? 'bg-red-700': 'bg-[--main-color]'} btn text-xs mt-3 focus:outline-[--light-color] border-0 text-white`}>{x? 'Remove from cart': 'Add to cart'}</button>
  )
}
