"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Features() {
  const slides = [
    {
      id: 1,
      title: "Built on credible books & sources",
      description: "Each lesson draws from life-changing books and trusted resources—backed by verified research and transparent citations.",
      features: [
        "Growth through book wisdom",
        "Live web insights for modern context",
        "Verified guidance you can trust",
        "Full transparency in sources"
      ],
      image: "/phone/features/feature_1.png",
      imageAlt: "Lecture details with real sources",
      layout: "left", // text on left, image on right
      hasBackground: false
    },
    {
      id: 2,
      title: "Listen, learn, and interact",
      description: "Engage as you learn. Listen actively, take notes, and connect your journey with our smart AI guide—ready to chat via voice or text.",
      features: [
        "Jot reflections while you listen",
        "Voice or text reactions welcomed",
        "AI that understands and cares"
      ],
      images: ["/phone/features/feature_2.png", "/phone/features/feature_3.png"],
      imageAlts: ["Audio player with note taking", "AI assistant interaction"],
      layout: "right", // text on right, images on left
      hasBackground: false
    },
    {
      id: 3,
      title: "All your notes in one place",
      description: "Capture your breakthroughs in one place. Gogue organizes your insights and reflections, helping you revisit progress and keep building.",
      features: [
        "Automatic journaling of your lessons",
        "Easy review and retrieval",
        "Reflect and discuss with AI companion",
      ],
      image: "/phone/features/feature_4.png",
      imageAlt: "Notes list view",
      layout: "left", // text on left, images on right
      hasBackground: false
    },
    // {
    //   id: 4,
    //   title: "Daily glimpses of knowledge",
    //   description: "Discover fascinating facts and insights about your areas of interest every day. Glimpses keeps you engaged with bite-sized knowledge that sparks curiosity and expands your learning journey.",
    //   features: [
    //     "Personalized daily facts",
    //     "Category-based insights",
    //     "Engaging micro-learning"
    //   ],
    //   images: ["/phone/glimpses2.png", "/phone/glimpses1.png"],
    //   imageAlts: ["Daily glimpses feature", "Glimpses detail view"],
    //   layout: "right", // text on right, images on left
    //   hasBackground: false
    // }
  ];

  const renderSlideContent = (slide: typeof slides[0]) => {
    const textContent = (
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {slide.title}
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          {slide.description}
        </p>
        <ul className="text-lg text-gray-600 space-y-2">
          {slide.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {feature}
            </li>
          ))}
        </ul>
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
    ) : (
      // Multiple images - Hero-style composition on mobile, side-by-side on desktop
      <div className="flex-shrink-0">
        {/* Desktop: Side by side */}
        <div className="hidden lg:flex gap-4 justify-center">
          {slide.images?.map((image, index) => (
            <div key={index} className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src={image}
                  alt={slide.imageAlts?.[index] || ""}
                  width={220}
                  height={420}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Overlapping composition like Hero section */}
        <div className="lg:hidden relative w-[280px] h-[580px] mx-auto">
          {slide.images?.map((image, index) => (
            <div
              key={index}
              className={`absolute bg-black rounded-[30px] p-2 shadow-xl ${index === 0
                  ? "bottom-0 right-[-45px] w-[280px] h-[580px] z-10" // Main phone
                  : "bottom-[-20px] left-[-45px] w-[212px] h-[450px] z-20"     // Background phone
                }`}
            >
              <div className="w-full h-full bg-gray-900 rounded-[24px] overflow-hidden">
                <Image
                  src={image}
                  alt={slide.imageAlts?.[index] || ""}
                  width={index === 0 ? 160 : 120}
                  height={index === 0 ? 280 : 210}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const content = slide.layout === "left" ? (
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {textContent}
        {imageContent}
      </div>
    ) : (
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
        {textContent}
        {imageContent}
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
      <div className="bg-gray-50 rounded-none md:rounded-3xl py-8 md:py-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
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
              <div className="min-h-[600px] flex items-center px-4 lg:px-10">
                {renderSlideContent(slide)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .features-swiper .swiper-pagination {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 12px !important;
          margin-top: 48px !important;
          position: static !important;
        }
        
        .features-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          margin: 0 !important;
          transition: background-color 0.2s ease !important;
          background-color: #d1d5db !important;
          opacity: 1 !important;
        }
        
        .features-swiper .swiper-pagination-bullet:hover {
          background-color: #9ca3af !important;
        }
        
        .features-swiper .swiper-pagination-bullet-active {
          background-color: #3b82f6 !important;
        }
        
        .features-swiper .swiper-pagination-bullet-active:hover {
          background-color: #2563eb !important;
        }
      `}</style>
    </div>
  );
} 