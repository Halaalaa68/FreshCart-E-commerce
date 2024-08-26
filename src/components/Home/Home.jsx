import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import Sliders from '../Sliders/Sliders'
import MainSlider from '../MainSlider/MainSlider'
import { UserTokenContext } from '../../assets/Context/UserTokenContext'
import { IsAddContext } from '../../assets/Context/IsAddContext'
import toast from 'react-hot-toast'
import { CartContext } from '../../assets/Context/CartContext/CartContext'
import Products from '../Products/Products'
export default function Home() {
  let {token, setToken}= useContext(UserTokenContext)
  let {isAdd, setisAdd}= useContext(IsAddContext)
  let {Cart, setCart}= useContext(CartContext)
  const [validUser, setValidUser] = useState(token)
  const [CartRes, setCartRes] = useState([])
  let liked;
  let btn;
  let response=useQuery({
    queryKey: ["wishlistProducts"],
    queryFn: getWishlist,
    refetchInterval:100,
    refetchOnWindowFocus: true,
    
  })
  function getWishlist(){
    if(token)
    {
      addlike()
      return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: token
        },
      },
    )
    }
    else return []
}
let addRes=useQuery({
  queryKey: ["addAutoProducts"],
  queryFn: addAuto,
      refetchInterval:100,
    refetchOnWindowFocus: true,
})
async function addAuto(){
  if(token)
  {
    if(localStorage.getItem('firstLogin')=='true')
    {
      let res= await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
          productId: '6408e98e6406cd15828e8f30',
        }, 
        {
          headers: {
            token: token,
          },
        })
      let removeres= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/6408e98e6406cd15828e8f30',{
            headers:{
              token: token
            }
          }
          )
          localStorage.setItem('firstLogin', false)
      }
      getCart()
    
    return removeres
  }
  else return 1
}

async function getCart(){
  if(token)
  {
    let myRes= await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: token
      },
    },
  )
  setCart(myRes?.data?.data?.products)
      return myRes
  }

  else{
    setCart([])
    return []
  }
}
function addlike(){

  setisAdd(response?.data?.data?.data)
}
function postCart(id){
    console.log(Cart)
    btn= Cart?.find((element)=> element.product.id==id)
    if(!btn){
      axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
          productId: id,
        }, 
        {
          headers: {
            token: token,
          },
        },
      ).then((res)=>{
        console.log(res)
        toast.success('Added to cart successfully')
      }
      )
      .catch((res)=>console.log(res))
    }
    else{
      axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token: token
        }
      }).then((res)=>{
        console.log(res)
        toast.error('removed from cart successfully')
      }).catch((res)=>console.log(res))
    }
  }
  function like(id){
    liked= isAdd?.find((product)=> product.id==id)
    if(!liked){
      axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
        {
          productId: id,
        }, 
        {
          headers: {
            token: token,
          },
        },
      ).then((res)=>{
        console.log(res)
        toast.success('Added to wishlist successfully')
      }
      )
      .catch((res)=>console.log(res))
    }
    else{
      axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:{
          token: token
        }
      }).then((res)=>{
        console.log(res)
        toast.error('removed from wishlist successfully')
      }).catch((res)=>console.log(res))
    }
  }
  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  let {data}=useQuery({
    queryKey: ["allProducts"],
    queryFn: getProducts
  })
  return (
    <>
    <MainSlider/>
      <Sliders/>
      <Products/>
    </>
    
  )
}
