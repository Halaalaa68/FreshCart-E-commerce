import React from 'react'

export default function Loading({load}) {
  return (
    <div className={`z-10 fixed top-0 bottom-0 left-0 right-0 bg-white opacity-15 ${load? 'block' : 'hidden'}`}>

    </div>
  )
}
