import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { IsAddContext } from '../../assets/Context/IsAddContext'
export default function Heart({id, like}) {
  let {isAdd, setisAdd}= useContext(IsAddContext)
  let x= isAdd?.find((product)=> product.id==id)
  return (
    <button onClick={()=>like(id)} key={id} className='bg-transparent outline-none border-0 focus:outline-none'><i className={!x? "fa-regular fa-heart text-red-700" : "fa-solid fa-heart text-red-700"}></i></button>
  )
}
