import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Slider from "react-slick";

export default function Sliders() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 7,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ],
    }
    function getCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
      let {data}=useQuery({
        queryKey: ["allCategories"],
        queryFn: getCategories
      })
  return (
    <div className="slider-container w-[95%] m-auto">
    <Slider {...settings}>
      {data?.data?.data?.map((category)=>(
          <div key={category._id} className='flex flex-col items-center justify-center mt-16'>
          <img src={category.image} className='w-full lg:h-40 h-28 object-contain' alt={category.name} />
          <p>{category.name}</p>
      </div>
        ))}
    </Slider>
    </div>
  );
}


{/* <div className='flex flex-col items-center justify-center'>
                <img src={category.image} className='w-full' alt={category.name} />
                <p>{category.name}</p>
            </div> */}
