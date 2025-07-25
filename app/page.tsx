import Image from "next/image";
import { Lecture } from "@/types";
import { LectureShowcase } from "@/components/LectureShowcase";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyGogue } from "@/components/WhyGogue";

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
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/roadmap"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex md:hidden items-center px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white text-xs md:text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get access
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16 px-4">
          {/* Text Content - Left */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 md:leading-14">
              Turn any topic into an <span className="text-blue-500 whitespace-nowrap">AI powered</span> audio lecture
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
              <div className="absolute bottom-0 left-0 w-[195px] h-[400px] bg-black rounded-[30px] p-2 shadow-xl transform z-30">
                <div className="w-full h-full bg-gray-900 rounded-[24px] overflow-hidden">
                  <Image
                    src="/phone/preview1.png"
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
                    src="/phone/home1_2.png"
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
          <div className="text-center mb-32 px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Lectures created by our users</h2>
            <LectureShowcase lectures={lectures} />
          </div>
        )}

        {/* Features Section */}
        <Features />  

        {/* How it works */}
        <HowItWorks />



        {/* Why Gogue */}
        <WhyGogue />

        {/* CTA */}
        <div className="text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to learn anything in 10 minutes?</h2>
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
