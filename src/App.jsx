import { useState } from 'react'
import './App.css'
// import '../src/slick.css'
// import '../src/slick-theme.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Register from './components/Register/Register'
import toast, { Toaster } from 'react-hot-toast';
import UserTokenContextProvider from './assets/Context/UserTokenContext'
import Wishlist from './components/Wishlist/Wishlist'
import Productdetails from './components/Productdetails/Productdetails'
import IsAddContextProvider from './assets/Context/IsAddContext'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './assets/Context/CartContext/CartContext'
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders' 
import Settings from './components/Settings/Settings'
import ForgotPass from './components/ForgotPass/ForgotPass'
import Verify from './components/Verify/Verify'
import UpdatePass from './components/UpdatePass/UpdatePass'
import Success from './components/Success/Success'
import NotFound from './components/Notfound/NotFound'
// import { PrimeReactProvider } from 'primereact/api';
function App() {
  let query =new QueryClient()
  let x= createBrowserRouter([
    {path:"", element: <Layout />, children:[
      {index:true, element: <Home/>},
      {path:"Cart", element: <Cart/>},
      {path:"Products", element: <Products/>},
      {path:"Categories", element: <Categories/>},
      {path:"Brands", element: <Brands/>},
      {path:"Login", element: <Login/>},
      {path:"Register", element: <Register/>},
      {path:"Wishlist", element: <Wishlist/>},
      {path:"Productdetails/:id", element: <Productdetails/>},
      {path:"Cart/Checkout", element: <Checkout/>},
      {path:"allorders", element: <AllOrders/>},
      {path:"Settings", element: <Settings/>},
      {path:"ForgotPass", element: <ForgotPass/>},
      {path:"Verify", element: <Verify/>},
      {path:"UpdatePass", element: <UpdatePass/>},
      {path:"Success", element: <Success/>},
      {path:"*", element:<NotFound/>},
    ]},
  ])
  return (
    <>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <IsAddContextProvider>
          <UserTokenContextProvider>
          <RouterProvider router={x}></RouterProvider>
            <ReactQueryDevtools/>
            <Toaster />
          </UserTokenContextProvider>
        </IsAddContextProvider>
      </CartContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
