import React from 'react'
import amazon from '../../assets/kisspng-amazon-com-amazon-pay-united-states-business-onlin-pay-day-5b24414caca049.6580906915291026687071.png'
import amer from '../../assets/dddda5b89b9cf6fe6687f0e21f161bd5.png'
import master from '../../assets/b71d709df66911c92acace84ee9f7f4e.png'
import paypal from '../../assets/5cecf2c1ee40676bcef484efe1853bff.png'
import iphone from '../../assets/pngegg (1).png'
import android from '../../assets/pngegg (2).png'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <>
      <div className='p-7 bg-slate-200'>
        <h2 className='font-normal'>Get the FreshCart App</h2>
        <p className='text-slate-400'>We will send you a link, open it on your phone to download the app.</p>
          <form className="flex items-center lg:w-[95%] mx-auto mt-3 mb-3">   
            <label htmlFor="search" className="sr-only">Share App Link</label>
            <div className="relative w-full">
              <input type="email" id="search" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[--light-color] focus:border-[--light-color] block w-full ps-10 p-2.5" placeholder="Email" required />
            </div>
            <button type="submit" className="btn bg-[--main-color] lg:w-1/5 text-center py-3 px-3 ms-2 text-sm font-medium text-white rounded-lg hover:border-none hover:shadow-[--shadow] focus:ring-4 focus:outline-none focus:ring-[--light-color]">Share App Link
            </button>
          </form>
          <hr className='h-px my-8 bg-slate-300 border-0 dark:bg-gray-700'/>
          <div className="flex items-center lg:w-[95%] w-full mx-auto mt-3 justify-between flex-wrap">
            <section className='flex items-center gap-2 xl:w-1/3 lg:w-1/2 w-full mb-3 md:mb-0 justify-center'>
              <p className='w-fit'>Payment Partners</p>
              <div className='flex justify-evenly w-1/2 md:w-1/3 lg:w-1/2'>
                <img src={amazon} className='w-1/4 cursor-pointer' alt="amazon" />
                <img src={amer} className='w-1/5 cursor-pointer' alt="american express" />
                <img src={master} className='w-1/5 cursor-pointer' alt="master card" />
                <img src={paypal} className='w-1/3 cursor-pointer' alt="paypal" />
              </div>
            </section>
            <section className='flex items-center gap-2 lg:w-1/3 w-full text-center justify-center'>
              <p className='w-fit'>Get deliveries with FreshCart</p>
              <div className='flex justify-center w-1/2 md:w-1/3 lg:w-1/2'>
                <img src={iphone} className='w-1/3 lg:w-1/2 xl:w-1/3 cursor-pointer' alt="amazon" />
                <img src={android} className='w-1/3 lg:w-1/2 xl:w-1/3 cursor-pointer' alt="american express" />
              </div>
            </section>
          </div>
            <hr className='h-px my-8 bg-slate-300 border-0 dark:bg-gray-700'/>
            <p className='text-xs'>Made with ❤ by <Link to='https://www.linkedin.com/in/hala-alaa-010134226'>Hala</Link></p>
      </div>
    </>
  )
}
