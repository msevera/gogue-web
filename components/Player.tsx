'use client';
import dynamic from 'next/dynamic';
import { useRef, useCallback, useEffect } from 'react';
import { trackAudioPlay, trackAudioPause, trackAudioProgress } from '@/utils/analytics';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

interface PlayerProps {
  audioStream?: string;
  className?: string;
  lectureId?: string;
  lectureTitle?: string;
}

export const Player = ({ audioStream, lectureId, lectureTitle }: PlayerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const lastProgressTime = useRef<number>(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  const handlePlay = useCallback(() => {
    if (lectureId && lectureTitle) {
      trackAudioPlay(lectureId, lectureTitle);
      isPlayingRef.current = true;
      
      // Start tracking progress every 30 seconds while playing
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current && isPlayingRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          
          if (currentTime > 0 && duration > 0 && currentTime - lastProgressTime.current >= 30) {
            trackAudioProgress(lectureId, lectureTitle, currentTime, duration);
            lastProgressTime.current = currentTime;
          }
        }
      }, 10000); // Check every 10 seconds for 30-second intervals
    }
  }, [lectureId, lectureTitle]);

  const handlePause = useCallback(() => {
    if (lectureId && lectureTitle && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      trackAudioPause(lectureId, lectureTitle, currentTime, duration);
      isPlayingRef.current = false;
      
      // Clear progress tracking when paused
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, [lectureId, lectureTitle]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Default circular play button
  return (
    <div className="relative">
      {/* Hidden ReactPlayer */}
      {audioStream && (
        <ReactPlayer
          ref={playerRef}
          src={audioStream}
          autoPlay={false}
          controls={true}
          width="100%"
          style={{ height: '50px' }}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={() => {
            isPlayingRef.current = false;
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
          }}
        />
      )}      
    </div>
  );
}; 