import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserTokenContext } from '../../assets/Context/UserTokenContext'
import { Link } from 'react-router-dom';
import Btn from '../Btn/Btn'
import Onlybtn from '../Onlybtn/Onlybtn'
import Heart from '../Heart/Heart'
import Onlyheart from '../Onlyheart/Onlyheart'
import { IsAddContext } from '../../assets/Context/IsAddContext'
import toast from 'react-hot-toast'
import { CartContext } from '../../assets/Context/CartContext/CartContext'

export default function Home() {
  let {token, setToken}= useContext(UserTokenContext)
  let {isAdd, setisAdd}= useContext(IsAddContext)
  let {Cart, setCart, NumofCart, setNumofCart, Search, setSearch}= useContext(CartContext)
  const [validUser, setValidUser] = useState(token)
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
  localStorage.setItem('NumofCart',Cart.length)
  setNumofCart(localStorage.getItem('NumofCart'))
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
        toast.success('Added to wishlist successfully')
      }
      )
      .catch((res)=>toast.error('Faild to add to wishlist'))
    }
    else{
      axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:{
          token: token
        }
      }).then((res)=>{
        toast.error('removed from wishlist successfully')
      }).catch((res)=>toast('Faild to remove from wishlist'))
    }
  }
  async function getProducts(){
    let p= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    let y=p.data.data
    if(Search)
    {
      let x=p.data.data.filter((p)=>(p.title.toLowerCase().includes(Search.toLowerCase())))
      return x
    }
    return y
  }
  let {data}=useQuery({
    queryKey: ["allProducts"],
    queryFn: getProducts,
    refetchInterval: 100,
    refetchOnWindowFocus: true,
  })
  return (
    <>
      <div className='w-[90%] m-auto mt-28 mb-16'>
      <div className='flex flex-wrap m-auto items-center gap-y-14 '>
        {data? data.map((product)=>(
          <div key={product._id} className='hover:shadow-2xl transition-all duration-200 pb-11 flex flex-col w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 cursor-pointer justify-center items-center relative group'>
            <Link to={`Productdetails/${product._id}`}>
            <div className='flex flex-col justify-center items-center'>
            <img src={product.imageCover} className='w-2/3' alt="" />
            <h3 className='text-[--main-color] font-serif'>{product.category.name}</h3>
            <p className='text-sm text-center text-black'>{product.title}</p>
            <div className='flex justify-start gap-16 mt-4 items-center'>
            <p className='font-sm text-black'>{product.price} EGP</p>
            <div className='flex justify-center gap-x-1 items-center'>
              <i className="fa-solid fa-star w-1/2 text-[--rating-color] text-xs"></i>
              <p className='w-1/2 text-xs text-black'>{product.ratingsAverage}</p>
            </div>
            </div>
            </div>
            </Link>
            <div className='w-[80%] m-auto'>
              <div className='flex justify-start items-center absolute bottom-[-20%] opacity-0 group-hover:bottom-[1%] group-hover:opacity-100 transition-all duration-500 m-auto w-full'>
                <div className='w-2/3'>{validUser? <Btn postCart={postCart} id={product._id}/> : <Onlybtn/>}</div>
                <div className='w-1/4'>
                {
                validUser?
                <Heart id={product._id} like={like}/> : <Onlyheart/>
                }
              </div>
              </div>
            </div>
          </div>
        )): <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>}
      </div>
    </div>
    </>
    
  )
}
