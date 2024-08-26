import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserTokenContext } from '../../assets/Context/UserTokenContext'
import { useQuery } from '@tanstack/react-query'
import fedex from '../../assets/Fedex-logo.png'
import dhl from '../../assets/dhl-logo-2.png'
import * as yup from 'yup'
import { Formik, useFormik } from 'formik'
import { CartContext } from '../../assets/Context/CartContext/CartContext'
export default function Checkout() {
    let {token, setToken}= useContext(UserTokenContext)
    const [CartID, setCartID] = useState(0)
    let schema= yup.object().shape({
        details: yup.string().min(1,'minimum letgth is 1').required('details are required'),
        phone: yup.string().matches(/^01[0-2]\d{1,8}$/, 'Invalid phone number').required('Phone is required'),
        city: yup.string().required('city is required'),
      })
    //   console.log(CartId)
    async function checkout(id,url, values){
        let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
            {
            shippingAddress: values,
            },
            {
            headers: {
               token: token,
            }
        }
        )
        window.location.href = data.session.url
    }
    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:'',
        },
        validationSchema:schema,
        onSubmit: ()=>confirmOrder(CartID,'http://localhost:5173')
    });
    async function confirmOrder(id,url){
      // console.log(CartID)
      let res=await checkout(id,url,formik.values)
      console.log(res)
   }
    let cartRes=useQuery({
        queryKey: ["CartProducts"],
        queryFn: getCart,
        staleTime: 500,
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
    //   console.log(res)
    //   console.log(res.data.data._id)
      setCartID(res.data.data._id)
      return res
      }
  return (
    <>
    <div className='mt-20'>
  <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <Link to="Home" className="text-2xl font-bold text-gray-800">FreshCart</Link>
    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <div className="relative">
        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
            <span className="font-semibold text-gray-900">Shop</span>
          </li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
            <span className="font-semibold text-gray-900">Shipping</span>
          </li>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
            <span className="font-semibold text-gray-500">Payment</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {
            cartRes?.data?.data?.data?.products?.length > 0 ? cartRes.data?.data.data.products.map((product)=>(
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={product.product.imageCover} />
            <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">{product.product.title}</span>
            <p className="text-lg font-sans font-bold">{product.price} LE</p>
            </div>
        </div>
            ) ): null
        }
      </div>
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <form className="mt-5 grid gap-6">
        <div className="relative">
          <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
            <img className="w-14 object-contain" src={fedex} />
            <div className="ml-5">
              <span className="mt-2 font-sans font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
        <div className="relative">
          <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
          <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
            <img className="w-14 object-contain" src={dhl} />
            <div className="ml-5">
              <span className="mt-2 font-sans font-semibold">DHL Delivery</span>
              <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
            </div>
          </label>
        </div>
      </form>
    </div>
    <form onSubmit={formik.handleSubmit}>
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">Complete your order by providing your payment details.</p>
      <div>
        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Details</label>
        <div className="relative">
        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name='details' id="details" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
        </div>
        <div className="flex">
          <div className="relative w-full flex-shrink-0">
          <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
          <input type="tel" id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
          </div>
        </div>
        <div>
        <label htmlFor="city" className="mt-4 mb-2 block text-sm font-medium">City</label>
          <select name="city" id="city" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city}  className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Giza">Giza</option>
            <option value="Luxor">Luxor</option>
            <option value="Sharqia">Sharqia</option>
            <option value="Ismailia">Ismailia</option>
          </select>
        </div>
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">{cartRes?.data?.data?.data?.totalCartPrice}LE</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">50LE</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">{cartRes?.data?.data?.data?.totalCartPrice + 50} LE</p>
        </div>
      </div>
      <button type='submit' className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
    </div>
    </form>
  </div>
</div>


    </>
  )
}
