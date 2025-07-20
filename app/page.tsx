import Image from "next/image";
import { Lecture } from "@/types";
import { LectureShowcase } from "@/components/LectureShowcase";

export default async function Home() {
  let lectures: Lecture[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
      body: JSON.stringify({
        query: `query GetLectures($input: FindLecturesInput, $pagination: PaginationInput) {
          lectures(input: $input, pagination: $pagination) {
            items {
                id
                topic
                title    
                audio {
                  stream
                  duration      
                }
                image {
                  webp
                  color
                }                  
            }         
          }    
        }`,
        variables: {
          input: {},
          pagination: {
            limit: 11,
            sort: [{
              by: 'createdAt',
              order: 'DESC'
            }]
          }
        },
      }),
    });

    const { data } = await response.json();
    lectures = data?.lectures?.items;
  } catch (error) {
    console.error('Error fetching lectures:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Gogue" width={120} height={32} />
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get early access
          </a>
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
              className="hidden lg:inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get early access
            </a>
          </div>

          {/* iPhone Demo Composition - Right */}
          <div className="flex-shrink-0">
            <div className="relative w-[340px] h-[550px]">
              {/* Background Phone - Left */}
              <div className="absolute bottom-0 left-0 w-[195px] h-[400px] bg-black rounded-[30px] p-2 shadow-xl  transform z-30">
                <div className="w-full h-full bg-gray-900 rounded-[24px] overflow-hidden">
                  <Image
                    src="/phone/preview-screen.png"
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
                    src="/phone/home-screen.png"
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

        {/* Real Lectures Section */}
        {lectures && lectures.length > 0 && (
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Lectures created by our users</h2>
            <LectureShowcase lectures={lectures} />
          </div>
        )}

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 md:pt-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3.75 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.016 0c.85.493 1.508 1.333 1.508 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose any topic</h3>
              <p className="text-gray-600">Enter anything you want to learn about. From quantum physics to cooking techniques.</p>
            </div>
            <div className="p-6 md:pt-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.531V19.94a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get your lecture</h3>
              <p className="text-gray-600">AI creates a personalized 15-minute audio lecture using the best information from the web.</p>
            </div>
            <div className="p-6 md:pt-0">
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

        {/* Why Gogue */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The internet is full of knowledge. Learning from it should be simple.
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Millions of articles and videos exist—but who has time to sift through it all?
Gogue turns complex info into short, personalized audio lessons you can absorb anywhere.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-white rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">The old way</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>Spend hours researching across multiple sources</li>
                      <li>Get overwhelmed by information scatter</li>
                      <li>Need dedicated quiet time to focus</li>
                      <li>Generic content that may not stick</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">The Gogue way</h3>
                    <ul className="space-y-2">
                      <li>Get a complete 15-minute expert lecture</li>
                      <li>AI curates the best information for you</li>
                      <li>Learn while doing anything, anywhere</li>
                      <li>Ask questions and get instant answers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to learn anything in 15 minutes?</h2>
          <p className="text-lg text-gray-600 mb-8">Join others learning faster with Gogue</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get early access
          </a>
        </div>
      </div>
    </div>
  );
}
