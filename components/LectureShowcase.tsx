'use client';
import { Lecture } from '@/types';
import Image from "next/image";
import { useState, useEffect } from "react";

function formatTime(seconds: number, munutesOnly?: boolean) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  if (munutesOnly) {   
    return `${minutes + 1}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}


// Client component for lecture showcase with audio functionality
export const LectureShowcase = ({ lectures }: { lectures: Lecture[] }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});
  const [hlsInstances, setHlsInstances] = useState<Record<string, any>>({});
  console.log('lectures', lectures.length);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      Object.values(hlsInstances).forEach(hls => {
        if (hls && hls.destroy) {
          hls.destroy();
        }
      });
    };
  }, [hlsInstances]);

  const handlePlayPause = async (lectureId: string, streamUrl: string) => {
    console.log('handlePlayPause', lectureId, streamUrl);

    // Stop currently playing audio
    if (currentlyPlaying && currentlyPlaying !== lectureId) {
      const currentAudio = audioElements[currentlyPlaying];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // Destroy HLS instance if exists
      const currentHls = hlsInstances[currentlyPlaying];
      if (currentHls && currentHls.destroy) {
        currentHls.destroy();
        setHlsInstances(prev => {
          const newInstances = { ...prev };
          delete newInstances[currentlyPlaying];
          return newInstances;
        });
      }
    }

    // Get or create audio element for this lecture
    let audio = audioElements[lectureId];
    if (!audio) {
      audio = new Audio();
      setAudioElements(prev => ({ ...prev, [lectureId]: audio }));
    }

    if (currentlyPlaying === lectureId) {
      // Pause current
      audio.pause();
      setCurrentlyPlaying(null);
      return;
    }

    // Check if it's an HLS stream
    const isHLS = streamUrl.includes('.m3u8') || streamUrl.includes('m3u8');

    if (isHLS) {
      // Dynamic import for hls.js to avoid SSR issues
      const Hls = (await import('hls.js')).default;

      if (Hls.isSupported()) {
        // Use hls.js for browsers that don't support HLS natively
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(audio);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play();
          setCurrentlyPlaying(lectureId);
        });

        hls.on(Hls.Events.ERROR, (event: any, data: any) => {
          console.error('HLS error:', data);
        });

        setHlsInstances(prev => ({ ...prev, [lectureId]: hls }));
      } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        audio.src = streamUrl;
        audio.play();
        setCurrentlyPlaying(lectureId);
      } else {
        console.error('HLS not supported in this browser');
        return;
      }
    } else {
      // Regular audio file
      audio.src = streamUrl;
      audio.play();
      setCurrentlyPlaying(lectureId);
    }

    // Auto-stop when finished
    audio.onended = () => {
      setCurrentlyPlaying(null);
    };
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {lectures.map((lecture: Lecture) => (
        <div key={lecture.id} className="group cursor-pointer relative p-2 rounded-xl" style={{ backgroundColor: `${lecture.image?.color}66` }}>
          <div className="relative aspect-square mb-3 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={lecture.image?.webp || '/placeholder-lecture.jpg'}
              alt={lecture.title}
              width={500}
              height={500}

            // className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" /> */}


          </div>
          <h3 className="text-sm font-medium text-gray-900 text-left line-clamp-2 truncate mb-2">
            {lecture.title}
          </h3>
          {/* Play Button */}
          <div className="flex justify-between">
            <button
              onClick={() => handlePlayPause(lecture.id, lecture.audio?.stream)}
              className="inset-0 flex items-center justify-center transition-opacity duration-200"
            >
              <div className="cursor-pointer">
                {currentlyPlaying === lecture.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="5 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-gray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="5 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-gray-800">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </button>
            <div className='flex-row items-center px-2 py-1 rounded-full'
              style={{
                backgroundColor: `${lecture.image?.color}4D`,
              }}>
              <div className='text-gray-800 text-xs'>{formatTime(lecture?.audio?.duration!, true)}min</div>
            </div>
          </div>
        </div>
      ))}

      {/* Create Your Own Card */}
      {/* <a
        href="https://apps.apple.com/app/gogue" // Replace with your actual App Store URL
        target="_blank"
        rel="noopener noreferrer"
        className="group cursor-pointer"
      >
        <div className="relative aspect-square mb-3 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br bg-blue-500 flex items-center justify-center">
          <div className="text-center text-white">            
            <div className="text-sm font-semibold">Check out<br />more</div>
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-900 text-center">
          Download the app
        </h3>
      </a> */}
      <div className="flex justify-center items-center bg-blue-100 rounded-xl">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Get early access
        </a>
      </div>
    </div>
  );
};