import React, { useContext, useState } from 'react'
import { UserTokenContext } from '../../assets/Context/UserTokenContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../assets/Context/CartContext/CartContext'
import toast from 'react-hot-toast'
import Loading from '../Loading/Loading'
import empty from '../../assets/empty_cart.png'
export default function Cart() {
  let {token, setToken}= useContext(UserTokenContext)
  let {CartId, setCartId,CartOwner, setCartOwner}= useContext(CartContext)
  const [load, setLoad] = useState(false)
  const [cartSpin, setcartSpin] = useState(false)
  let btn;
  if(token)
  {
    async function clearCart()
    {
      setcartSpin(true)
      let res= await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:{
          token:token
        }
      })
      let addres= await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
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
      clearSpin()
      console.log(removeres)
      localStorage.setItem('firstLogin',true)
      
      return res
    }
    function clearSpin(){
      setcartSpin(false)
    }
    async function updateCount(id,count){
      let res=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count: count,
      },
      {
      headers: {
        token: token
      },
    },
    ).then((res)=>{
      console.log(res)
      setLoad(false)
    }

    ).catch((res)=>console.log(res))
    }
    function addProduct(id, count, qnty){
      if(count<qnty)
      {
        setLoad(true)
        count++
        console.log(id)
        updateCount(id,count);
      }
    }
    function lessProduct(id, count){
      if(count>=2)
      {
        setLoad(true)
        count--
        console.log(id)
        updateCount(id,count);
      }
    }
   async function remove(id){
    setLoad(true)
     let res= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{
          token: token
        }
      }).then((res)=>{
        console.log(res)
        setLoad(false)
        toast.error('removed from cart successfully')
      }).catch((res)=>
        {
        console.log(res)
        setLoad(false)
   })
    }
    let cartRes=useQuery({
      queryKey: ["CartProducts"],
      queryFn: getCart,
      staleTime: 500,
      refetchInterval:100,
      refetchOnWindowFocus: true,
      
    })
    async function getCart(){
      let res= await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: token
        },
      },
    )
    // console.log(res.data.data.cartOwner)
    setCartId(res.data.data._id)
    localStorage.setItem('Owner',res.data.data.cartOwner)
    // console.log(localStorage.getItem('Owner'))
    return res
    // setCartId(res.data.data._id)
  }
    // console.log(CartOwner)
    return(
      <>
      <div>
      <div className={`fixed top-0 bottom-0 right-0 left-0 justify-center items-center bg-white z-40 ${cartSpin? 'flex' : 'hidden'}`}>
      <div className="loader text-center  w-[40%] lg:h-[10%] h-[20%]"></div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Link to='/allorders' className='absolute top-20 left-[5%] lg:left-[10%] mb-4 me-auto mt-7'>All orders</Link>
      <button onClick={()=>clearCart()} className={`${cartRes?.data?.data?.data?.products?.length > 0? 'block' : 'hidden'} text-red-600 bg-transparent hover:border-0 border-0 focus:outline-none me-auto absolute top-20 right-[5%] lg:right-[10%] mb-4 text-3xl`}><i class="fa-solid fa-trash-can"></i></button>
      <div className="relative lg:w-[80%] mx-auto w-[90%] mt-36 mb-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className={`text-xs text-white uppercase bg-[--main-color] ${cartRes?.data?.data?.data?.products?.length > 0? '' : 'hidden'}`}>
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
           { cartRes?.data?.data?.data?.products?.length > 0 ? cartRes.data.data.data.products.map((product)=>(
            <tr key={product.product.id} className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Link to={`/Productdetails/${product.product.id}`} className='text-black font-bold hover:text-black hover:underline'>
                {product.product.title}
                </Link>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={()=>lessProduct(product.product.id, product.count)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M1 1h16" />
                    </svg>
                    <Loading load={load}/>
                  </button>
                  <div>
                    <input id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1" placeholder={product.count} disabled />
                  </div>
                  <button onClick={()=>addProduct(product.product.id, product.count, product.product.quantity)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                    <Loading load={load}/>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.price * product.count}LE
              </td>
              <td className="px-6 py-4">
                <button onClick={()=>remove(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline bg-transparent hover:border-0 outline-none border-0 focus:outline-none">Remove
                <Loading load={load}/>
                </button>
              </td>
            </tr>)) : <tr>
            <div className='flex justify-center items-center'><img src={empty} className='w-[50%]' alt="empty cart" /></div>
              </tr>
          }
          </tbody>
        </table>
      </div>
      {
        cartRes?.data?.data?.data?.totalCartPrice>0?
        <div className='w-[90%] lg:w-[80%] mb-5 flex justify-between items-center'>
          <p><span className='text-[--main-color]'>Total Cart Price:</span> {cartRes?.data?.data?.data?.totalCartPrice}</p>
          <button className='bg-[--main-color] hover:bg-lime-500'><Link className='text-white hover:text-white' to='Checkout'>Checkout</Link></button>
        </div> : null
      }
      </div>
      </div>
      </>
    )
  }
  return (
    <div className='flex flex-col justify-center items-center h-96 mt-16 mb-6'>
        <h1 className='text-center'>You have no account</h1>
        <p className='text-center'>Please login to show your cart details</p>
        <Link className='text-[--main-color] hover:text-[--main-color]' to='/Login'>Login</Link>
      </div>
  )
}
