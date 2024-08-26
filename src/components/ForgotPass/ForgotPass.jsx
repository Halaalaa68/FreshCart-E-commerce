import axios from 'axios'
import React from 'react'
import { Formik, useFormik } from 'formik'
import toast from 'react-hot-toast';
import {Link, Navigate, useNavigate } from 'react-router-dom';
import freshcart from '../../assets/freshcart-logo.svg'
export default function ForgotPass() {
  const navigate =useNavigate()
    let formik = useFormik({
        initialValues:{
            email:'',
        },
        onSubmit: forgotpass
    });
  function forgotpass(values)
    {
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        .then((res)=>{
            toast.success(res.data?.message)
            navigate('/Verify')
        }).catch((res)=>{
          toast.error(res.response? res.response.data.message : res.message)})
    }
  return (
    <>
<div className="container mx-auto mt-28">
  <div className="flex m-auto justify-center px-6 my-12">
    <div className="w-full xl:w-3/4 lg:w-11/12 flex mx-auto">
      <div className="m-auto hidden lg:block lg:w-1/2 rounded-l-lg"><img src={freshcart} className='w-full text-center' alt="" /></div>
      <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
        <div className="px-8 mb-4 text-center">
          <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
          <p className="mb-4 text-sm text-gray-700">
            We get it, stuff happens. Just enter your email address below and we'll send you a
            link to reset your password!
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id="email" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter Email Address..." />
          </div>
          <div className="mb-6 text-center">
            <button type='submit' className="w-full px-4 py-2 font-bold text-white bg-[--main-color] rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline">
              Reset Password
            </button>
          </div>
          <hr className="mb-6 border-t" />
          <div className="text-center">
            <Link to='/Register' className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
              Create an Account!
            </Link>
          </div>
          <div className="text-center">
            <Link to='/Login' className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
              Already have an account? Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  </div>
</>
  )
}
