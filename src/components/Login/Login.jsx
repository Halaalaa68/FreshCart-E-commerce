import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../assets/Context/UserTokenContext';
export default function Login() {
    let {token, setToken}= useContext(UserTokenContext) 
    const navigate =useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    localStorage.setItem('firstLogin', true)
    let formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        onSubmit: log
    });
    function log(values){
        setIsLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then((res)=>{
            setIsLoading(false)
            if(res.data.message==='success')
                {
                    localStorage.setItem('userToken', res.data.token)
                    setToken(res.data.token)
                    localStorage.setItem('name', res.data.user.name)
                    navigate('/')
            }
        }).catch((res)=>{
            setIsLoading(false)
            toast.error(res.response.data.message)
        })
        
    }
  return (
    <>
    <h2 className='text-[--main-color] capitalize mt-28 mb-8 text-center text-3xl'>Login Now</h2>
        <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-[--main-color] capitalize">Your email</label>
            <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" required />
        </div>
        <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-[--main-color] capitalize">Your password</label>
            <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600" required />
        </div>
        <div>
        <Link to='/ForgotPass' className="hover:underline ms-2 text-xs mb-3 font-medium block text-gray-900 hover:text-gray-900">Forgot password?</Link>
        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Don't have an account? <Link to='/Register' className="text-[--main-color] hover:text-lime-600 hover:underline">Register now</Link></label>
        <button type="submit" className="mt-2 mb-7 text-white block hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[--main-color]">{isLoading? <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div> : 'Login'}</button>
        </div>
        </form>
    </>
  )
}
