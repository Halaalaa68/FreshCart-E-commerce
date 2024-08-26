import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Formik, useFormik } from 'formik'
import toast from 'react-hot-toast';
import * as yup from 'yup'
import { UserTokenContext } from '../../assets/Context/UserTokenContext';
export default function Register() {
  let {token, setToken, name, setname}= useContext(UserTokenContext)
  const navigate =useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  localStorage.setItem('firstLogin', true)
  let schema= yup.object().shape({
    name: yup.string().min(2,'minimum letgth is 2').max(25,'maximum length is 25').required('Name is required'),
    email:yup.string().email('Invalid Email').required('Email is required'),
    phone: yup.string().matches(/^01[0-2]\d{1,8}$/, 'Invalid phone number').required('Phone is required'),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password should be minimum eight characters, at least one letter and one number').required('Password is required'),
    rePassword: yup.string().oneOf([ yup.ref("password")], 'Password and Repassword are not the same!').required('Repassword is required'),

  })
  let formik = useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:'',
    },
    validationSchema:schema,
    onSubmit: signUp
});
function signUp(values){
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then((res)=>{
      toast.success('Account has been created successfully!')
      setIsLoading(false)
      navigate('/')
      if(res.data.message==='success')
        {
            localStorage.setItem('userToken', res.data.token)
            localStorage.setItem('name', res.data.user.name)
            setToken(res.data.token)
        }
    }).catch((res)=>{
      toast.error(res.response.data.message)
      setIsLoading(false)
    })    
}
  return (
    <>
    <h2 className='text-[--main-color] capitalize mt-28 mb-8 text-center text-3xl'>Register Now</h2>
      <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
          <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
          {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.name}</span>
          </div>: null}

          </div>
          <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
          <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
          {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div>: null}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
          {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div>: null}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900">Repeat password</label>
          <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' id="rePassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
          {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>: null}
          </div>
          <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Your phone</label>
          <input type="tel" id="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--main-color] block w-full p-2.5" required />
          {formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.phone}</span>
          </div>: null}
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div>
        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Have an account? <Link to='/Login' className="text-[--main-color] hover:text-lime-600 hover:underline">Login</Link></label>
        <button type="submit" className="mt-2 mb-7 text-white block hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[--main-color]">{isLoading? <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div> : 'Register new account'}</button>
      </form>
    </>
  )
}
