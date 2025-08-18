'use client';
import { Lecture } from '@/types';
import { formatTime } from '@/utils/utils';
import Image from "next/image";
import { EarlyAccessButton } from "@/components/EarlyAccessButton";
import Link from "next/link";

// Client component for lecture showcase
export const LectureShowcase = ({ lectures }: { lectures: Lecture[] }) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {lectures.map((lecture: Lecture) => (
        <Link href={`/lectures/${lecture.slug}`} key={lecture.id} className="group cursor-pointer relative p-2 rounded-xl block" style={{ backgroundColor: `${lecture.image?.color}66` }}>
          <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={lecture.image?.webp || '/placeholder-lecture.jpg'}
              alt={lecture.title}
              width={500}
              height={500}
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" /> */}


          </div>
          <h3 className="text-sm font-medium text-gray-900 text-left line-clamp-2 truncate mb-2">
            {lecture.title}
          </h3>
          {/* Play Button */}
          <div className="flex justify-between">
            <div className='flex-row items-center px-2 py-1 rounded-full'
              style={{
                backgroundColor: `${lecture.image?.color}4D`,
              }}>
              <div className='text-gray-800 text-xs'>open</div>
            </div>
            <div className='flex-row items-center px-2 py-1 rounded-full'
              style={{
                backgroundColor: `${lecture.image?.color}4D`,
              }}>
              <div className='text-gray-800 text-xs'>{formatTime(lecture?.audio?.duration || 0, true)}min</div>
            </div>
          </div>
        </Link>
      ))}
      <EarlyAccessButton
        location="lecture_showcase"
        element="showcase_cta_card"
        className="group cursor-pointer relative p-2 rounded-xl bg-blue-100"
      >
        <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-md lg:text-xs font-semibold">Check out<br /> more in the app</div>
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-900 text-left line-clamp-2 truncate mb-2">
          Get early access
        </h3>
        <div className="flex justify-between">
          <div className="cursor-pointer">
            <svg width="19px" height="19px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <title>ionicons-v5-k</title>
              <path
                d="M384,224V408a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V168a40,40,0,0,1,40-40H271.48"
                style={{
                  fill: "none",
                  stroke: "#000000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 32
                }}
              />
              <polyline
                points="336 64 448 64 448 176"
                style={{
                  fill: "none",
                  stroke: "#000000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 32
                }}
              />
              <line
                x1="224"
                y1="288"
                x2="440"
                y2="72"
                style={{
                  fill: "none",
                  stroke: "#000000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 32
                }}
              />
            </svg>
          </div>
          <div className='flex-row items-center px-2 py-1 rounded-full bg-blue-200'>
            <div className='text-gray-800 text-xs'>Free</div>
          </div>
        </div>
      </EarlyAccessButton>
    </div>
  );
};