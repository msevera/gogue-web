import Image from "next/image";
import Link from "next/link";
import { Lecture } from "@/types";
import { EarlyAccessButton } from "@/components/EarlyAccessButton";
import { Metadata, ResolvingMetadata } from 'next';
import { Player } from "@/components/Player";
import { LectureDetails } from '@/components/LectureDetails';
import { trackAIDiscussionClick } from '@/utils/analytics';

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const loadLecture = async (id: string) => {
  let lecture: Lecture | null = null;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/graphql`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
      body: JSON.stringify({
        query: `query GetLectureDetails($id: ID!) {
          lecture(id: $id) {
            id
            topic
            title    
            overview
            audio {
              stream
              duration      
            }
            image {
              webp
              color
            }
            sections {                  
              title
              overview
            }  
            research {     
              annotations {
                title
                url
              }
            }                      
          }    
        }`,
        variables: {
          id
        },
      }),
    });

    const { data } = await response.json();
    lecture = data?.lecture;
  } catch (error) {
    console.error('Error fetching lectures:', error);
  }

  return lecture;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params

  // fetch data
  const lecture = await loadLecture(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: lecture?.title,
    description: lecture?.overview,
    openGraph: {
      images: [lecture?.image?.webp as string, ...previousImages],
    },
  }
}


export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lecture = await loadLecture(id);
  if (!lecture) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Lecture not found</h1>
            <p className="text-gray-600 mb-8">The lecture you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Track AI discussion click handler
  const handleAIDiscussionClick = () => {
    trackAIDiscussionClick(lecture.id, lecture.title, 'lecture_ask_ai');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} />
            </Link>
          </div>
          <EarlyAccessButton
            location="lecture_header"
            element="lecture_header_button"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get early access
          </EarlyAccessButton>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Lecture Image */}
          <div className="space-y-6">
            <div
              className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer"
              style={{ backgroundColor: `${lecture.image?.color}66` }}
            >
              <Image
                src={lecture.image?.webp || '/placeholder-lecture.jpg'}
                alt={lecture.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column - Lecture Details */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {lecture.title}
              </h1>
              {lecture.topic && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {lecture.topic}
                </p>
              )}
            </div>
            <Player
              audioStream={lecture.audio?.stream}
              lectureId={lecture.id}
              lectureTitle={lecture.title}
            />
            {/* Lecture Details with Tabs */}
            <LectureDetails lecture={lecture} />
            
            {/* Combined Call to Action */}
            <div 
              className="rounded-2xl p-8 text-white"
              style={{
                background: `linear-gradient(to bottom right, #3b82f6, ${lecture.image?.color || '#8b5cf6'})`
              }}
            >
              <div className="space-y-6">
                {/* Ask AI Section */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Ask Anything About This Lecture</h3>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      Discuss this lecture and ask related questions with our AI assistant. Get deeper insights and clarify concepts.
                    </p>
                    <EarlyAccessButton
                      location="lecture_ask_ai"
                      element="lecture_ask_ai_button"
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-500 font-semibold rounded-full hover:bg-gray-100 transition-colors mr-4 mb-4"
                    >
                      Start AI Discussion
                    </EarlyAccessButton>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20"></div>

                {/* Explore More Section */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Want to explore other lectures or create yours?</h3>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      Get early access to Gogue and start creating personalized audio lectures on any topic you want to learn about.
                    </p>
                    <EarlyAccessButton
                      location="lecture_cta"
                      element="lecture_cta_button"
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-500 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                    >
                      Get early access
                    </EarlyAccessButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="max-w-6xl mx-auto">       
        <Features />
      </div> */}
    </div>
  );
}
