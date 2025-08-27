import Image from "next/image";
import { Lecture } from "@/types";
import { LectureShowcase } from "@/components/LectureShowcase";
import { Features } from "@/components/Features";
import { HowItWorksCarousel } from "@/components/HowItWorksCarousel";
import { EarlyAccessButton } from "@/components/EarlyAccessButton";

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
                slug
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
            <Image src="/logo.svg" alt="Gogue" width={120} height={32} className="w-20 h-6 md:w-[120px] md:h-8" />
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/roadmap"
              className="block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </a>
            <EarlyAccessButton
              location="header"
              element="mobile_access_button"
              className="hidden items-center px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white text-xs md:text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get early access
            </EarlyAccessButton>
          </div>
        </div>
      </header>

      {/* Hero Section with radial gradient from bottom */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 1) 100%)'
        }}></div>
        <div className="relative max-w-6xl mx-auto pt-16 pb-16 px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-8">
            {/* Text Content - Left */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                {/* Turn books into <AnimatedText phrases={["goal-focused", "problem-focused", "topic-focused"]} className="text-blue-500 whitespace-nowrap" /> audio lessons */}
                {/* <span className='whitespace-nowrap'>Turn books into <AnimatedText phrases={["goal-focused", "topic-focused"]} className="text-blue-500 whitespace-nowrap" /></span> audio lessons */}
                {/* <span className='whitespace-nowrap'>Turn <AnimatedText phrases={["goals", "problems"]} className="text-blue-500 whitespace-nowrap" /> + book =</span> <span className='whitespace-nowrap'>actionable solution</span> */}
                {/* <AnimatedText
                  sentences={[
                    'Stuck on a product problem?',
                    'Roadmap chaos?',
                    'Problem with\r\ngrowth?',
                    'Strategy feels\r\nfuzzy?',
                    'Team issues?'
                  ]}
                // className="whitespace-nowrap"
                /> */}
                Want to grow personally?
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-normal">
                Simply share your goal, pick a book, and receive a custom audio lesson packed with actionable insights.
              </p>
              <EarlyAccessButton
                location="hero_section"
                element="hero_cta_button"
                className="inline-flex items-center px-4 py-2 md:px-8 md:py-4 bg-blue-500 text-white text:base md:text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                ariaLabel="Get early access"
              >
                Get early access
              </EarlyAccessButton>
            </div>

            {/* iPhone Demo Composition - Right */}
            <div className="flex-shrink-0">
              <div className="relative w-[340px] h-[550px]">
                {/* Background Phone - Left */}
                <div className="absolute bottom-0 left-0 w-[195px] h-[400px] bg-black rounded-[30px] p-2 shadow-2xl ring-1 ring-black/10 transform z-30">
                  <div className="w-full h-full bg-gray-900 rounded-[24px] overflow-hidden">
                    <Image
                      src="/phone/hero/hero_3.png"
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
                <div className="absolute top-0 right-0 transform w-[250px] h-[530px] bg-black rounded-[35px] p-2 shadow-2xl ring-1 ring-black/10 z-20">
                  <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                    <Image
                      src="/phone/hero/hero_2.png"
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
        </div>
      </section>

      {/* Main content below hero */}
      <div className="">
        <div className='max-w-6xl mx-auto pt-24'>

          <HowItWorksCarousel />
          {/* Real Lectures Section */}
          {lectures && lectures.length > 0 && (
            <div className="tchext-center mb-32 px-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Lectures created by our users</h2>
              <LectureShowcase lectures={lectures} />
            </div>
          )}

          {/* Features Section */}
          <Features />



          {/* Why Gogue */}
          {/* <WhyGogue /> */}

          {/* CTA */}
          <div className="text-center px-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to solve your problems?</h2>
            <p className="text-lg text-gray-600 mb-8">Join a community of lifelong learners growing with Gogue. Start your self-growth journey today.</p>
            <EarlyAccessButton
              location="bottom_cta"
              element="final_cta_button"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get early access
            </EarlyAccessButton>
          </div>
        </div>
      </div>
    </div>
  );
}
