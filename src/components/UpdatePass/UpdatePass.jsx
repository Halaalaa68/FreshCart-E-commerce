import React from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import toast from 'react-hot-toast';
import {Link, Navigate, useNavigate } from 'react-router-dom';
import freshcart from '../../assets/freshcart-logo.svg'
import * as yup from 'yup'
export default function UpdatePass() {
    const navigate =useNavigate()
    let schema= yup.object().shape({
        newPassword: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password should be minimum eight characters, at least one letter and one number').required('Password is required')})
    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },
        validationSchema:schema,
        onSubmit: update
    });
    function update(values)
    {
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
        .then((res)=>{ console.log(res)
            toast.success(res.data?.message)
            navigate('/Success')
        }).catch((res)=>{
          toast.error(res.response? res.response.data.message : res.message)
          console.log(res)})
        // console.log(res)
    }
  return (
    <>
    <div className="container mx-auto mt-28">
  <div className="flex m-auto justify-center px-6 my-12">
    <div className="w-full xl:w-3/4 lg:w-11/12 flex mx-auto">
      <div className="m-auto hidden lg:block lg:w-1/2 rounded-l-lg"><img src={freshcart} className='w-full text-center' alt="" /></div>
      <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
        <div className="px-8 mb-4 text-center">
          <h3 className="pt-4 mb-2 text-2xl">Update your password</h3>
        </div>
        <form onSubmit={formik.handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id="email" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
            <label className="block mb-2 mt-2 text-sm font-bold text-gray-700" htmlFor="email">
              New Password
            </label>
            <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} name='newPassword' id="newPassword" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
            {formik.errors.newPassword && formik.touched.newPassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.newPassword}</span>
          </div>: null}
          </div>
          <div className="mb-6 text-center">
            <button type='submit' className="w-full px-4 py-2 font-bold text-white bg-[--main-color] rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline">
              Submit
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
