import Image from "next/image";
import Link from "next/link";
import { Lecture } from "@/types";
import { Metadata, ResolvingMetadata } from 'next';
import { formatTime } from '@/utils/utils';

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
              annotations {
                title
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
  console.log('lecture', lecture);
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
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get early access
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Lecture Image */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square rounded-3xl overflow-hidden"
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

            {/* Overview Section */}
            <div 
              className="bg-gray-50 rounded-2xl p-6"
              style={{ backgroundColor: `${lecture.image?.color}20` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs text-gray-700"
                    style={{ backgroundColor: `${lecture.image?.color}30` }}>
                    Created from {lecture.sections?.length || 0} sources
                  </div>
                  <div
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs text-gray-700"
                    style={{ backgroundColor: `${lecture.image?.color}30` }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {formatTime(lecture?.audio?.duration || 0, true)}min
                  </div>
                </div>
              </div>                           
              
              <div className="text-gray-700 leading-relaxed">
                {lecture.overview || "This lecture covers key concepts and insights about " + lecture.topic.toLowerCase() + ", gathered from the best sources on the web."}
              </div>
            </div>

 

            {/* Call to Action */}
            <div className="bg-blue-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-3">Want to listen to this lecture or create yours?</h3>
              <p className="mb-6 opacity-90">
                Get early access to Gogue and start creating personalized audio lectures on any topic you want to learn about.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-500 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Get early access
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
