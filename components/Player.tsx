'use client';
import React, { useRef, useCallback, useEffect } from 'react';
import { trackAudioPlay, trackAudioPause, trackAudioProgress } from '@/utils/analytics';

// Import the mux-audio web component
import '@mux/mux-audio';

// Using React.createElement to avoid TypeScript issues with custom elements

interface PlayerProps {
  audioStream?: string;
  playbackId?: string;
  className?: string;
  lectureId?: string;
  lectureTitle?: string;
  envKey?: string;
}

export const Player = ({ 
  audioStream, 
  playbackId, 
  lectureId, 
  lectureTitle, 
  envKey,
  className 
}: PlayerProps) => {
  const playerRef = useRef<HTMLAudioElement>(null);
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
          const currentTime = playerRef.current.currentTime;
          const duration = playerRef.current.duration;
          
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
      const currentTime = playerRef.current.currentTime;
      const duration = playerRef.current.duration;
      trackAudioPause(lectureId, lectureTitle, currentTime, duration);
      isPlayingRef.current = false;
      
      // Clear progress tracking when paused
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }
  }, [lectureId, lectureTitle]);

  const handleEnded = useCallback(() => {
    isPlayingRef.current = false;
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Render mux-audio component
  return (
    <div className={`relative ${className || ''}`}>
      {(audioStream || playbackId) && (
        React.createElement('mux-audio', {
          ref: playerRef,
          src: audioStream,
          'playback-id': playbackId,
          controls: true,
          style: { width: '100%', height: '50px' },
          onPlay: handlePlay,
          onPause: handlePause,
          onEnded: handleEnded,
          'metadata-video-id': lectureId,
          'metadata-video-title': lectureTitle,
          'env-key': envKey,
        })
      )}      
    </div>
  );
}; 