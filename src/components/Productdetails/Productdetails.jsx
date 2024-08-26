import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { UserTokenContext } from '../../assets/Context/UserTokenContext';
import Onlybtn from '../Onlybtn/Onlybtn';
import Onlyheart from '../Onlyheart/Onlyheart';
import Btn from '../Btn/Btn';
import Heart from '../Heart/Heart';
import { CartContext } from '../../assets/Context/CartContext/CartContext';
import { IsAddContext } from '../../assets/Context/IsAddContext';
import toast from 'react-hot-toast';
export default function Productdetails() {
    let {id} = useParams()
    let {token, setToken}= useContext(UserTokenContext) 
    let {Cart, setCart, setNumofCart}= useContext(CartContext)
    let {isAdd, setisAdd}= useContext(IsAddContext)
    let liked;
    let cartRes=[]
    let response=[]
  let btn;
  if(token)
    {
    response=useQuery({
      queryKey: ["wishlistProducts"],
      queryFn: getWishlist,
      refetchInterval:100,
      refetchOnWindowFocus: true,
      
    })
    function getWishlist(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: token
        },
      },
    )
  }
   cartRes=useQuery({
    queryKey: ["CartProducts"],
    queryFn: getCart,
    refetchInterval:100,
    refetchOnWindowFocus: true,
    
  })
  async function getCart(){
    let res=await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: token
      },
    },
  )
  localStorage.setItem('NumofCart',Cart.length)
  setNumofCart(localStorage.getItem('NumofCart'))
  return res
  }

  }
setCart(cartRes?.data?.data?.data?.products)
setisAdd(response?.data?.data?.data)
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
      .catch((res)=>toast.error('Faild to add to cart'))
    }
    else{
      axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token: token
        }
      }).then((res)=>{
        toast.error('removed from cart successfully')
      }).catch((res)=>toast('Faild to remove from cart'))
    }
  }
  function like(id){
    liked= isAdd.find((product)=> product.id==id)
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
      .catch((res)=>toast.error('Failed to add to wishlist'))
    }
    else{
      axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:{
          token: token
        }
      }).then((res)=>{
        toast.error('removed from wishlist successfully')
      }).catch((res)=>toast('Failed to remove from wishlist'))
    }
  }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "red" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
          />
        );
      }
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    let {data}=useQuery({
        queryKey: ["specificProduct"],
        queryFn: getProductDetails,
        staleTime:0,
        refetchInterval:100,
        refetchOnWindowFocus:false,
      })
    function getProductDetails(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    // console.log(data)
  return (
    <div className='flex justify-center items-center w-[90%] m-auto mt-20 mb-8 gap-x-3'>
      {
        data? 
        <>
          <div className='w-1/4'>
        <Slider {...settings}>
            {data?.data.data.images.map((image)=>(
                <img key={data.data.data._id} src={image} className='w-full object-contain' />
            ))}
        </Slider>
        </div>
        <div className='w-1/2'>
            <h2 className='text-3xl text-[--main-color] mb-2'>{data?.data.data.title}</h2>
            <p>{data?.data.data.description}</p>
            <div className='flex justify-between mt-4 items-center'>
                <p className='font-sm'>{data?.data.data.price} EGP</p>
                <div className='flex justify-center items-center w-1/2 gap-x-1'>
                    <i className="fa-solid fa-star text-[--rating-color] text-xs"></i>
                    <p className='text-xs'>{data?.data.data.ratingsAverage}</p>
                </div>
            </div>
            <div className='flex justify-between items-center mt-3'>
                <div className='w-2/3'>
                    {
                        token? <Btn postCart={postCart} id={id}/> : <Onlybtn/>
                    }
                </div>
                <div className='w-1/4'>
                {
                    token? <Heart id={id} like={like}/> : <Onlyheart/>
                }
                </div>
            </div>
        </div>
        </>
    : <div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div>       }
</div>
  )
}
