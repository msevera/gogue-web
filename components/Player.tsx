'use client';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

interface PlayerProps {
  audioStream?: string;
  className?: string;
}

export const Player = ({ audioStream }: PlayerProps) => {
  // Default circular play button
  return (
    <div className="relative">
      {/* Hidden ReactPlayer */}
      {audioStream && (
        <ReactPlayer
        src={audioStream}
        autoPlay={false}
        controls={true}
        width="100%"
        style={{ height: '50px' }}
      />
      )}      
    </div>
  );
}; 