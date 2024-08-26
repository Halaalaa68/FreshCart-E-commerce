import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
export default function Onlyheart(){
    return (<>
    <Popup trigger={
      <button className='bg-transparent outline-none border-0 focus:outline-none'><i className='fa-regular fa-heart text-red-700'></i></button>} modal nested>
        { close => (<div>
        <div className="modal w-1/2 m-auto md:w-fit relative">
        <button className="close focus:outline-none" onClick={close}> &times;</button>
        <div className="header"> You don't have an account </div>
        <div className="content">
          
          Please Login so you can make orders, add products to cart or add products to wishlist.
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button m-auto text-white block hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[--main-color]"> <Link to='/Login' className='text-white hover:text-white'>Login</Link> </button>}
            position="top center"
            nested
          >
          </Popup>
        </div>
      </div>
    </div>
    )}
  </Popup>
    </>
)
}