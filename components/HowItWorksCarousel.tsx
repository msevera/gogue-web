"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import type { SwiperRef } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function HowItWorksCarousel() {
  const swiperRef = useRef<SwiperRef>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      step: 1,
      title: "Set Your Growth Goal",
      description: "Define what you want to improve—confidence, \nproductivity, focus, habits, mindset.",
      features: [
      ],
      image: "/phone/how_it_works/how_it_works_1_3.png",
      imageAlt: "Set your growth goal",
      layout: "left", // text on left, image on right
      hasBackground: false,
      className: "bg-gradient-to-r from-gray-50 via-gray-50 to-[#BCC1B5]/50",
      // className: "bg-gray-50",
      titleClassName: "text-gray-900",
      descriptionClassName: "text-gray-600",
    },
    {
      id: 2,
      step: 2,
      title: "Select a Book",
      description: "Use your favorite self-development book \nor explore a recommended framework you like.",
      features: [
      ],
      image: "/phone/how_it_works/how_it_works_2.png",
      imageAlts: "Select a book",
      layout: "left", // text on right, images on left
      hasBackground: false,
      className: "bg-gradient-to-r from-[#BCC1B5]/50 via-[#BCC1B5]/50 to-[#B7CCD8]/50",
      // className: "bg-[#BCC1B5]/50",
      titleClassName: "text-gray-900",
      descriptionClassName: "text-gray-600",
    },
    {
      id: 3,
      step: 3,
      title: "Learn, Reflect & Grow",
      description: "Listen to a personalized audio lesson, take notes,\n and have conversations with your AI coach.",
      features: [

      ],
      image: "/phone/how_it_works/how_it_works_3.png",
      imageAlt: "Learn, reflect & grow",
      layout: "left", // text on left, images on right
      hasBackground: false,
      className: "bg-gradient-to-r from-[#B7CCD8]/50 via-[#B7CCD8]/50 to-gray-50", 
      // className: "bg-[#B7CCD8]/50",
      titleClassName: "text-gray-900",
      descriptionClassName: "text-gray-600",
    },
  ];

  const renderSlideContent = (slide: typeof slides[0]) => {
    const textContent = (
      <div className="flex-1 text-center lg:text-center">

        <h2 className={`text-2xl md:text-4xl font-bold ${slide.titleClassName} mb-6`}>
          <div className="flex items-center justify-center">
            <div className="flex items-center w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full justify-center text-white text-2xl font-bold mb-6">{slide.step}</div>
          </div>
          {slide.title}
        </h2>
        <p className={`text-xl ${slide.descriptionClassName} leading-normal md:whitespace-pre-line`}>
          {slide.description}
        </p>       
      </div>
    );

    const imageContent = slide.image ? (
      // Single image
      <div className="flex-shrink-0">
        <div className="w-[280px] h-[580px] bg-black rounded-[35px] p-2 shadow-xl mx-auto">
          <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.imageAlt || ""}
              width={260}
              height={520}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    ) : null;

    const content = slide.layout === "left" ? (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {textContent}
          {imageContent}
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-10 lg:gap-16">
          {textContent}
          {imageContent}
        </div>
      </div>
    );

    return slide.hasBackground ? (
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
        {content}
      </div>
    ) : (
      content
    );
  };

  return (
    <div className="mb-32 md:px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">How it works</h2>
      <div className="rounded-none md:rounded-3xl overflow-hidden">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          // autoplay={{
          //   delay: 5000,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            el: '#swiper-custom-pagination',
            clickable: true,
          }}
          className="features-swiper"
          style={{
            '--swiper-pagination-bottom': '0px',
            '--swiper-pagination-bullet-inactive-opacity': '1',
          } as React.CSSProperties}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`min-h-[600px] flex items-center px-4 lg:px-10 py-8 md:py-12 ${slide.className}`}>
                {renderSlideContent(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* External pagination container */}
      <div 
        ref={paginationRef}
        id="swiper-custom-pagination"
        className="flex justify-center items-center gap-3 mt-12"
      ></div>

      <style jsx global>{`
        .swiper-pagination {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 12px !important;
          position: static !important;
        }
        
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 !important;
          transition: background-color 0.2s ease !important;
          background-color: #d1d5db !important;
          opacity: 1 !important;
        }
        
        .swiper-pagination-bullet:hover {
          background-color: #9ca3af !important;
        }
        
        .swiper-pagination-bullet-active {
          background-color: #3b82f6 !important;
        }
        
        .swiper-pagination-bullet-active:hover {
          background-color: #2563eb !important;
        }
      `}</style>
    </div>
  );
} 