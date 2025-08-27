'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const steps = [
  {
    number: 1,
    title: "Set Your Growth Goal",
    subtitle: "Define what you want to improve—confidence, productivity, focus, habits, mindset.",
    image: "/phone/how_it_works/how_it_works_1.png"
  },
  {
    number: 2,
    title: "Select a Book",
    subtitle: "Use your favorite self-development book or explore a recommended framework you like.",
    image: "/phone/how_it_works/how_it_works_2.png"
  },
  {
    number: 3,
    title: "Learn, Reflect & Grow",
    subtitle: "Listen to a personalized audio lesson, take notes, and have conversations with your AI coach.",
    image: "/phone/how_it_works/how_it_works_3.png"
  }
];

export function HowItWorks() {
  return (
    <div className="mb-32 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
      
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        // navigation={{
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // }}
        breakpoints={{
          768: {
            slidesPerView: 1.2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1.5,
            spaceBetween: 50,
          }
        }}
        className="how-it-works-swiper"
      >
        {steps.map((step, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center gap-8 h-[400px] md:h-[500px]">
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-10 md:h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl md:text-2xl">{step.number}</span>
                </div>
              </div>
              
              {/* Image - Half visible from bottom */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-[200px] md:w-[280px] aspect-[9/19.5]">
                  <div className="absolute bottom-[-150px] w-full h-full rounded-[22px] overflow-hidden ring-1 ring-gray-200">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>                  
                </div>
              </div>
              
              {/* Title and Subtitle */}
              <div className="flex-1 pl-4 md:pl-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  {step.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation Buttons */}
        {/* <div className="swiper-button-prev !text-blue-600 !w-12 !h-12 !bg-white !rounded-full !shadow-lg after:!text-lg"></div>
        <div className="swiper-button-next !text-blue-600 !w-12 !h-12 !bg-white !rounded-full !shadow-lg after:!text-lg"></div> */}
        
        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-4"></div>
      </Swiper>
      
      <style jsx global>{`
        .how-it-works-swiper {
          padding-bottom: 60px;
        }
        
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
        }
        
        .swiper-pagination-bullet-active {
          background: #2563eb;
        }
        
        .swiper-button-prev,
        .swiper-button-next {
          top: 50%;
          transform: translateY(-50%);
        }
        
        .swiper-button-prev {
          left: 20px;
        }
        
        .swiper-button-next {
          right: 20px;
        }
      `}</style>
    </div>
  );
} 