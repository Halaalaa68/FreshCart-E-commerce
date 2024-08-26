import axios from 'axios'
import React, { useContext } from 'react'
import { Formik, useFormik } from 'formik'
import toast from 'react-hot-toast';
import {Link } from 'react-router-dom';
import freshcart from '../../assets/freshcart-logo.svg'
import { UserTokenContext } from '../../assets/Context/UserTokenContext';
import * as yup from 'yup'
export default function Settings() {
  let schema= yup.object().shape({
    name: yup.string().min(2,'minimum letgth is 2').max(25,'maximum length is 25').required('Name is required'),
    email:yup.string().email('Invalid Email').required('Email is required'),
    phone: yup.string().matches(/^01[0-2]\d{1,8}$/, 'Invalid phone number').required('Phone is required'),
  })
  let {token, setToken}= useContext(UserTokenContext)
    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            phone:'',
        },
        validationSchema:schema,
        onSubmit: update
    });
  function update(values)
    {
        axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {
          headers: {
            token: token,
          },
        }
        )
        .then((res)=>{
            toast.success('Data is updated')
        }).catch((res)=>{
          toast.error(res.response.data.errors.msg)})
    }
  return (
    <>
    <div className="container mx-auto mt-28">
    <div className="flex m-auto justify-center px-6 my-12">
    <div className="w-full xl:w-3/4 lg:w-11/12 flex mx-auto">
      <div className="m-auto hidden lg:block lg:w-1/2 rounded-l-lg"><img src={freshcart} className='w-full text-center' alt="" /></div>
      <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
        <div className="px-8 mb-4 text-center">
          <h3 className="pt-4 mb-2 text-2xl">Update your Email</h3>
          <p className="mb-4 text-sm text-gray-700">
            Enter you new Name, Email and Phone!
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id="name" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter Name" />
            {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div>: null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm mt-2 font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id="email" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter Email Address..." />
            {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div>: null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="phone">
              Phone
            </label>
            <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' id="phone" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter phone" />
            {formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.phone}</span>
          </div>: null}
          </div>
          <div className="mb-6 text-center">
            <button type='submit' className="w-full px-4 py-2 font-bold text-white bg-[--main-color] rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline">
              Update
            </button>
          </div>
          <hr className="mb-6 border-t" />
          <div className="text-center">
            <Link to='/' className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="#">
              Go back to home?
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
