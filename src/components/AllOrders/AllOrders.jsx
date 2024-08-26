import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, DropdownItem } from "flowbite-react";
import { useState } from 'react';
export default function AllOrders() {
    // console.log(day)
    let cartOwner=localStorage.getItem('Owner')
    // let date= new Date()
    // let day=date.toLocaleDateString();
    let orders=useQuery({
        queryKey: ["allOrders"],
        queryFn: getAllOrders,
      })
    function getAllOrders(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
    } 
    let indexedArray = orders?.data?.data
    // console.log(indexedArray)
    let [sortedArray, setsortedArray] = useState(indexedArray)
    // console.log(sortedArray)
    function click(v)
    {
        if(v=='new')
        {

            indexedArray = indexedArray.map((order, index) => ({ index, order }));
            // orders?.data?.data.filter(()=>
            indexedArray.sort((a, b) => b.index - a.index);
            // console.log(indexedArray)
            setsortedArray(indexedArray)
            // console.log(sortedArray)
        }
        if(v=='old')
        {
            setsortedArray(0)
        }
    }
    // console.log(sortedArray)
    // console.log(sortedArray)

    // console.log(orders)
    // console.log(CartOwner)
  return (
    <>
        <div className='w-[90%] m-auto mb-20 mt-28'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className='mb-4'>
        <Dropdown label="Sort" dismissOnClick={true}>
      <Dropdown.Item onClick={()=>click('new')}>Newest</Dropdown.Item>
      <Dropdown.Item onClick={()=>click('old')}>Oldest</Dropdown.Item>
    </Dropdown>
    </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
    
    <thead className="text-xs text-white uppercase bg-[--main-color]">
      <tr>
        <th scope="col" className="px-6 py-3">
          Date
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Phone
        </th>
        <th scope="col" className="px-6 py-3">
          Total
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        {
            sortedArray? sortedArray.map((order)=>(
                <tr className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {order.order.createdAt.slice(0,10).split('-').reverse().join("/")}
                    </th>
                    <td className="px-6 py-4">
                    {order.order.user.name}
                    </td>
                    <td className="px-6 py-4">
                    {order.order.user.phone}
                    </td>
                    <td className="px-6 py-4">
                    {
                        order.order.totalOrderPrice +'LE'
                    }
                    </td>
                    <td className="px-6 py-4">
                    <span className='text-red-700'>On Hold</span>
                    </td>
                </tr>
            )) : orders?.data?.data.map((order)=>(
                <tr className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {order.createdAt.slice(0,10).split('-').reverse().join("/")}
                    </th>
                    <td className="px-6 py-4">
                    {order.user.name}
                    </td>
                    <td className="px-6 py-4">
                    {order.user.phone}
                    </td>
                    <td className="px-6 py-4">
                    {
                        order.totalOrderPrice +'LE'
                    }
                    </td>
                    <td className="px-6 py-4">
                    <span className='text-red-700'>On Hold</span>
                    </td>
                </tr>))
        }
      
    </tbody>
  </table>
        </div>
        </div>

    </>
  )
    }
