import React from 'react'
import Navbarr from '../Navbar/Navbarr'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
export default function Layout() {
  return (
    <>
      <Navbarr/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
