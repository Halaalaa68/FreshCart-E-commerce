import Slider from "react-slick";
import s1 from '../../assets/Main Slider/banner-4.jpeg'
import s2 from '../../assets/Main Slider/blog-img-1.jpeg'
import s3 from '../../assets/Main Slider/blog-img-2.jpeg'
import s4 from '../../assets/Main Slider/grocery-banner-2.jpeg'
import s5 from '../../assets/Main Slider/slider-2.jpeg'
import s6 from '../../assets/Main Slider/slider-image-1.jpeg'
import s7 from '../../assets/Main Slider/slider-image-2.jpeg'
import s8 from '../../assets/Main Slider/slider-image-3.jpeg'
export default function MainSlider() {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "red" }}
            onClick={onClick}
          />
        );
      }
      
      function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: "none", background: "green" }}
            onClick={onClick}
          />
        );
      }
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        initialSlide: 0,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />

    }
  return (
    <div className='flex justify-center items-center w-[80%] m-auto mt-16'>
        <div className='md:w-2/3 w-full'>
        <Slider {...settings}>
            <img src={s1} className='h-[100px] md:h-[300px] xl:h-[400px] w-full object-cover' alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s2} alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s3} alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s4} alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s5} alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s6} alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s7} alt="market" />
            <img className='w-full h-[100px] md:h-[300px] xl:h-[400px] object-cover' src={s8} alt="market" />
        </Slider>
        </div>
        <div className='w-1/3 hidden md:flex flex-col items-center justify-center'>
            <div className='w-full'>
                <img className='h-[150px] xl:h-[200px] w-full object-cover' src={s7} alt="" />
            </div>
            <div className='w-full'>
                <img className='h-[150px] xl:h-[200px] w-full object-cover' src={s8} alt="" />
            </div>
        </div>
      </div>
  )
}
