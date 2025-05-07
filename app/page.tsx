"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Learnbud</h1>
        <p className="text-gray-600 text-lg">Your personalized AI lecturer</p>
      </div>
      
      <div className="relative w-[280px] h-[580px] bg-black rounded-[40px] p-3 shadow-2xl">
        {/* Screen content */}
        <div className="w-full h-full bg-gray-900 rounded-[32px] overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={isMuted}
            playsInline
          >
            <source src="/lecture.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            <span>Unmute</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
            <span>Mute</span>
          </>
        )}
      </button>

      <div className="text-center max-w-md">
        <p className="text-gray-700">
          Experience learning reimagined with AI-powered personalized lectures, 
          interactive lessons, and real-time feedback.
        </p>
      </div>

      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4">
          <div className="flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Join Waitlist
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
