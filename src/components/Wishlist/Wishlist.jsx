import React, { useContext, useState } from 'react'
import { UserTokenContext } from '../../assets/Context/UserTokenContext'
import { Link } from 'react-router-dom'
import { IsAddContext } from '../../assets/Context/IsAddContext'
import toast from 'react-hot-toast'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import empty from '../../assets/360_F_877197287_r7KpP49vsEN9lyWWYPqF6vDgL3yoJRY9.jpg'
export default function Wishlist() {
    // const [load, setLoad] = useState(false)
    let {token, setToken}= useContext(UserTokenContext)
    const [load, setLoad] = useState(false)
    let liked;
    if(token)
      {
       async function remove(id){
        setLoad(true)
         let res= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
              token: token
            }
          }).then((res)=>{
            console.log(res)
            setLoad(false)
            toast.error('removed from wishlist successfully')
          }).catch((res)=>
            {
            console.log(res)
            setLoad(false)
       })
        }
        let wishlistRes=useQuery({
          queryKey: ["wishlistProducts"],
          queryFn: getwishlist,
          staleTime: 500,
          refetchInterval:100,
          refetchOnWindowFocus: true,
          
        })
        function getwishlist(){
          return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
              token: token
            },
          },
        )
        }
        // console.log(wishlistRes)
        return(
          <div className="relative lg:w-[80%] mx-auto w-[90%] mt-24 mb-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className={`text-xs text-white uppercase bg-[--main-color] ${wishlistRes?.data?.data?.data?.length > 0? '' : 'hidden'}`}>
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
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
               { wishlistRes?.data?.data?.data?.length > 0 ? wishlistRes.data.data.data.map((product)=>(
                <tr key={product._id} className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <Link to={`/Productdetails/${product._id}`} className='text-black font-bold hover:text-black hover:underline'>
                    {product.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}LE
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={()=>remove(product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline bg-transparent hover:border-0 outline-none border-0 focus:outline-none">Remove
                    <Loading load={load}/>
                    </button>
                  </td>
                </tr>)) : <div className='flex justify-center items-center'><img src={empty} className='w-[40%]' alt="empty cart" /></div>
              }
              </tbody>
            </table>
          </div>
        )
      }
  return (
    <div className='flex flex-col justify-center items-center h-96 mt-16 mb-6'>
        <h1 className='text-center'>You have no account</h1>
        <p className='text-center'>Please login to show your wishlist details</p>
        <Link className='text-[--main-color] hover:text-[--main-color]' to='/Login'>Login</Link>
      </div>
  )
}
