import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const Brands = ({refCount,levelEarning}) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, // Set to 4 slides to show at all times
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay
    speed: 500, // Adjust speed for smoother sliding
    cssEase: "ease", // Change to ease for a smoother effect
    arrows: true,
    prevArrow: (
      <div className="prev-arrow tw-w-12 tw-h-12 tw-flex tw-justify-center tw-items-center tw-left-[-20px] md:tw-left-[-10px] tw-z-10">
        <FaArrowLeft className="tw-text-textColor" />
      </div>
    ),
    nextArrow: (
      <div className="next-arrow tw-w-12 tw-h-12 tw-flex tw-justify-center tw-items-center tw-right-[-20px] md:tw-right-[-10px] tw-z-10">
        <FaArrowRightLong className="tw-text-textColor" />
      </div>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4, // Show 4 slides on screens larger than 1200px
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4, // Show 4 slides on screens larger than 992px
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Show 3 slides on screens larger than 768px
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2, 
        },
      },
    ],
  };

  const brands = [
    { src: "brand1.png", name: "Level 1",level:'1',percentage:'10%'},
    { src: "brand2.png", name: "Level 2",level:'2',percentage:'7%'},
    { src: "brand3.png", name: "Level 3",level:'3',percentage:'5%'},
    { src: "brand4.png", name: "Level 4",level:'4',percentage:'3%'},
    { src: "brand5.png", name: "Level 5",level:'5',percentage:'2%' },
    { src: "brand5.png", name: "Level 6",level:'6' ,percentage:'1%'},
    { src: "brand5.png", name: "Level 7",level:'7' ,percentage:'1%'},
    { src: "brand5.png", name: "Level 8",level:'8',percentage:'1%' },
    { src: "brand5.png", name: "Level 9",level:'9' ,percentage:'1%'},
    { src: "brand5.png", name: "Level 10",level:'10',percentage:'2%' },

    // Add more brands as needed
  ];

  return (
    <div className="tw-relative tw-mt-12 tw-flex tw-items-center tw-justify-center">
      <div className="container tw-mx-auto">
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div className="sm:tw-p-3 tw-p-2" key={index}>
              <div
                className="tw-border sm:tw-p-4 tw-p-2 tw-rounded-tr-3xl tw-rounded-bl-3xl tw-border-[#FFE247]"
              >
                <div className="tw-flex tw-justify-end">
                  <div className="sm:tw-w-10 tw-w-8 tw-rounded-md tw-flex tw-justify-center tw-items-center sm:tw-h-10 tw-h-8   tw-bg-button-gradient">
                    <span className="tw-text-black tw-font-poppins sm:tw-text-sm tw-text-[9px]">{brand.percentage}</span>
                  </div>
                </div>
                <h4 className="sm:tw-text-xl tw-text-white tw-text-[16px] tw-mt-2 tw-font-semibold tw-text-center">
                  {brand.name}
                </h4>
                <div className="tw-w-full tw-flex-col tw-flex tw-justify-between tw-items-center">
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-my-2">
                    <span className="tw-text-white tw-text-[9px] tw-font-poppins sm:tw-text-base">Total Earning</span>
                    <span className="tw-text-white tw-text-[9px] sm:tw-text-base tw-font-poppins">{levelEarning[index]?Number(levelEarning[index])/10**6:0}</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span className="tw-text-white tw-text-[9px] sm:tw-text-base tw-font-poppins">Team</span>
                    <span className="tw-text-white tw-text-[9px] sm:tw-text-base tw-font-poppins">{refCount[index]?Number(refCount[index]):0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Brands;
