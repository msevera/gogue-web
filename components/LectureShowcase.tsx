'use client';
import { Lecture } from '@/types';
import { formatTime } from '@/utils/utils';
import Image from "next/image";
import { useState, useEffect } from "react";

// Type guard for HLS instances
function isHlsInstance(obj: unknown): obj is { destroy: () => void } {
  return obj !== null && typeof obj === 'object' && 'destroy' in obj && typeof (obj as Record<string, unknown>).destroy === 'function';
}

// Client component for lecture showcase with audio functionality
export const LectureShowcase = ({ lectures }: { lectures: Lecture[] }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});
  const [hlsInstances, setHlsInstances] = useState<Record<string, unknown>>({});  

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      Object.values(hlsInstances).forEach(hls => {
        if (isHlsInstance(hls)) {
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
      if (isHlsInstance(currentHls)) {
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

        hls.on(Hls.Events.ERROR, (event: unknown, data: unknown) => {
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
              <div className='text-gray-800 text-xs'>{formatTime(lecture?.audio?.duration || 0, true)}min</div>
            </div>
          </div>
        </div>
      ))}    
       <a
         href="https://docs.google.com/forms/d/e/1FAIpQLSfm22rOLcPKyxMFlCI2OGCIcJbjeNDaHVI8Prp76AW0D0Wpnw/viewform?usp=dialog"
         target="_blank"
         rel="noopener noreferrer"
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
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6 text-gray-800">
               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
             </svg>
           </div>
           <div className='flex-row items-center px-2 py-1 rounded-full bg-blue-200'>
             <div className='text-gray-800 text-xs'>Free</div>
           </div>
         </div>
       </a>
    </div>
  );
};