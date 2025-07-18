"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Gogue" width={120} height={32} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          {/* Text Content - Left */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Turn any topic into a <span className="text-blue-500 whitespace-nowrap">15-minute</span> audio lecture
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              The internet has all the information you need. Gogue transforms it into personalized audio lectures you can learn from anywhere.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Join Waitlist
            </a>
          </div>

          {/* iPhone Demo Composition - Right */}
          <div className="flex-shrink-0">
            <div className="relative w-[340px] h-[550px]">
              {/* Background Phone - Left */}
              <div className="absolute bottom-0 left-0 w-[195px] h-[400px] bg-black rounded-[30px] p-2 shadow-xl  transform z-30">
                <div className="w-full h-full bg-gray-900 rounded-[24px] overflow-hidden">
                  <Image 
                    src="/phone/img6.png" 
                    alt="Gogue App Screen 1" 
                    width={176} 
                    height={356}
                    className="w-full h-full object-cover"
                  />
                </div>                
              </div>

              {/* Background Phone - Right */}
              {/* <div className="absolute top-12 right-0 w-[180px] h-[370px] bg-black rounded-[30px] p-2 shadow-xl transform z-10">
                <div className="w-full h-full bg-gray-900 rounded-[24px] overflow-hidden">
                  <Image 
                    src="/phone/img5.png" 
                    alt="Gogue App Screen 2" 
                    width={176} 
                    height={356}
                    className="w-full h-full object-cover"
                  />
                </div>               
              </div> */}

              {/* Main Phone - Center Front */}
              <div className="absolute top-0 right-0 transform w-[250px] h-[530px] bg-black rounded-[35px] p-2 shadow-xl z-20">
                <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                  <Image 
                    src="/phone/img3.png" 
                    alt="Gogue App Main Screen" 
                    width={216} 
                    height={436}
                    className="w-full h-full object-cover"
                  />
                </div>                               
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3.75 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.016 0c.85.493 1.508 1.333 1.508 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose any topic</h3>
              <p className="text-gray-600">Enter anything you want to learn about. From quantum physics to cooking techniques.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.531V19.94a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get your lecture</h3>
              <p className="text-gray-600">AI creates a personalized 15-minute audio lecture using the best information from the web.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn & interact</h3>
              <p className="text-gray-600">Listen anywhere, take notes, and ask the AI tutor questions in real-time.</p>
            </div>
          </div>
        </div>

        {/* Problem/Solution */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The internet has everything. Finding and learning from it doesn't have to be hard.</h2>
            <p className="text-lg text-gray-600 mb-8">
              Millions of articles, videos, and research papers exist on every topic imaginable. But who has time to read through it all? 
              Gogue transforms this vast public knowledge into bite-sized, personalized audio experiences you can consume anywhere.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">❌ Traditional learning</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Hours of reading and research</li>
                  <li>• Information scattered everywhere</li>
                  <li>• Requires dedicated focus time</li>
                  <li>• No personalization</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">✅ Learning with Gogue</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 15-minute personalized lectures</li>
                  <li>• Best information, automatically curated</li>
                  <li>• Learn while walking, commuting, exercising</li>
                  <li>• Interactive AI tutor for questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to learn anything in 15 minutes?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands learning faster with Gogue</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get early access
          </a>
        </div>
      </div>
    </div>
  );
}
