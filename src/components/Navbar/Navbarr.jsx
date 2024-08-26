import React, { useContext, useState } from 'react'
import freshcart from '../../assets/freshcart-logo.svg'
import { Link } from "react-router-dom"
import { UserTokenContext } from '../../assets/Context/UserTokenContext';
import toast from 'react-hot-toast';
import { CartContext } from '../../assets/Context/CartContext/CartContext';
export default function Navbarr() {
  let {token, setToken,name, setname}=useContext(UserTokenContext)
  let {Cart, setCart, NumofCart, setNumofCart, Search, setSearch}=useContext(CartContext)
  const [show, setshow] = useState(false)
  const [menu, setmenu] = useState(false)
  const [y, sety] = useState(0)
  let x= window.location.pathname
  function clicked(){
    x= window.location.pathname
    if(x=='/') sety(1)
    if(x=='/Products') sety(2)
    if(x=='/Categories') sety(3)
    if(x=='/Brands') sety(4)
  }
function search(e){
  setSearch(e.target.value)
}
  let op=''
  function toggle()
  {
      setshow(!show)
  }
  function toggle2()
  {
      setmenu(!menu)
  }
  if(token)
    { 
      op='SignOut'
      setname(localStorage.getItem('name'))
    }
  else
  {
    op='Login'
    
  }
  function profile(){
  if(token)
    { 
      setToken('')
      localStorage.setItem('userToken', '')
      localStorage.setItem('name', '')
      toast.success('You have logged out successfully');
      setname('')
      setNumofCart('')
      localStorage.setItem('NumofCart', 0)
      sety(0)
    }
}
  return (
    <>
  <nav className="flex fixed top-0 left-0 right-0 dark:bg-slate-900 items-center z-50 bg-slate-50 justify-between px-5 py-6 w-full">
    <div>
    <Link to=''><img src={freshcart} className="mr-3 h-6 sm:h-9" alt="fresh cart React Logo" /></Link>
    </div>
    <ul id="drawer" onClick={()=>clicked()} role="menu" className="sm:gap-3 transition-left ease-[cubic-bezier(0.4, 0.0, 0.2, 1)] delay-150  sm:flex  flex flex-col cursor-pointer absolute min-h-screen -left-48 md:static w-48 -top-10 bg-white sm:shadow-none shadow-xl sm:bg-transparent sm:flex-row sm:w-auto sm:min-h-0">
      <li className="font-medium text-sm p-3 hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-primary">
      <Link to='' className={`${y==1? 'active' : ''} text-sm text-slate-600 hover:outline-none hover:text-slate-600 hover:border-0 active:rounded-lg`}><button className='bg-transparent p-0 border-0 outline-none focus:border-0 focus:outline-none'>Home</button>
      </Link>
      </li>
      <li className="font-medium text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
      <Link to='Products' className={`${y==2? 'active' : ''} text-sm pro text-slate-600 hover:outline-none hover:text-slate-600 hover:border-0`}><button className='bg-transparent p-0 border-0 outline-none focus:border-0 focus:outline-none'>Products</button></Link>
      </li>
      <li className="font-medium text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
      <Link to='Categories' className={`${y==3? 'active' : ''} text-sm text-slate-600 hover:outline-none hover:text-slate-600 hover:border-0`}><button className='bg-transparent p-0 border-0 outline-none focus:border-0 focus:outline-none'>Categories</button></Link>
      </li>
      <li className="font-medium text-sm p-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 sm:p-0 sm:hover:bg-transparent text-gray-600 hover:text-primary transition-colors">
      <Link to='Brands' className={`${y==4? 'active' : ''} text-sm text-slate-600 hover:outline-none hover:text-slate-600 hover:border-0`}><button className='bg-transparent p-0 border-0 outline-none focus:border-0 focus:outline-none'>Brands</button></Link>
      </li>
    </ul>
    <form className="bg-white rounded w-fit ms-1 me-1">
            <input type="text" onSubmit={()=>search(e)} onChange={(e)=>search(e)} name='text' id="text" className={`${y==1 || y==2? '' : 'hidden'} w-full text-sm leading-tight text-gray-700 border-0 focus:outline-none focus:border-0 rounded shadow appearance-none focus:shadow-outline`} placeholder="search" />
            </form>
    <div className="flex gap-3 items-center">
        <Link to='Cart' className="text-slate-600 hover:underline">
        <i className="fa-solid fa-bag-shopping text-3xl text-[--main-color] relative"> <span className='absolute bg-red-600 text-white px-1 text-center rounded top-[-15%] left-[-15%] text-xs'>{NumofCart>0? NumofCart : ''}</span></i>
        
        </Link>
      <button onClick={()=>toggle()} className="h-10 flex justify-center items-center w-10 hover:ring-4 user cursor-pointer relative ring-blue-700/30 rounded-full bg-cover bg-center bg-emerald-200">
        <h2 className='text-white font-sans font-medium text-xl'>{name? name[0]:'user'}</h2>
        <div className={`drop-down w-48 overflow-hidden bg-white rounded-md shadow absolute top-12 right-3 z-50 ${show? 'block' : 'hidden'}`}>
          <ul>
            <Link to='Settings' className={`${token?'block' : 'hidden'} text-sm  text-slate-600 hover:text-slate-600`}>
            <li className="px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            <span> Setting </span>
            </li>
            </Link>
            <Link to='Wishlist' className="text-sm text-slate-600 hover:text-slate-600">
              <li className="px-3  py-3 flex justify-start items-center text-sm font-medium space-x-2 hover:bg-slate-400">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>
              <span> Wishlist </span>
              </li>
            </Link>
              <Link className='text-sm flex items-center space-x-2 text-slate-600 hover:outline-none hover:text-slate-600 hover:border-0' to='Login'>
              <button type="button" onClick={()=>profile()} className="w-full text-slate-600 hover:outline-none hover:text-slate-600 hover:border-0 border-0 bg-transparent focus:outline-none font-medium rounded-lg m-0 text-sm p-0">
              <li className="px-3 py-3 text-sm gap-1 font-medium flex items-center space-x-2 hover:bg-slate-400">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>
                {op}
              </li>
              </button>
              </Link>
              
          </ul>
        </div>
      </button>
      <div className="md:hidden cursor-pointer" id="mobile-toggle">
        <button className='p-0 border-0 outline-none focus:border-0 focus:outline-none' onClick={()=>toggle2()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path className="dark:stroke-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <div className={`drop-down w-36 overflow-hidden bg-white rounded-md shadow absolute top-20 right-3 z-50 ${menu? 'block' : 'hidden'}`}>
          <ul onClick={()=>clicked()}>
            
             <Link to='' className={`text-sm  text-slate-600 hover:text-white`}><li className={`${y==1? 'bg-slate-400' : ''} px-3 py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400`}>Home</li></Link>
             <Link to='Products' className="text-sm  text-slate-600 hover:text-white"><li className={`${y==2? 'bg-slate-400' : ''} px-3  py-3  text-sm font-medium flex items-center space-x-2 hover:bg-slate-400`}>Products</li></Link> 
            <Link to='Categories' className="text-sm  text-slate-600 hover:text-white"><li className={`${y==3? 'bg-slate-400' : ''} px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400`}>Categories</li></Link>
             <Link to='Brands' className="text-sm  text-slate-600 hover:text-white"><li className={`${y==4? 'bg-slate-400' : ''} px-3  py-3 text-sm font-medium flex items-center space-x-2 hover:bg-slate-400`}>Brands</li></Link> 
            
          </ul>
        </div>
        </button>
      </div>
    </div>
  </nav>

    </>
  )
}