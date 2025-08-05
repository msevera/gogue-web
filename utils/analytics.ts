import { track } from '@vercel/analytics';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Google Analytics helper function
const gtag = (command: string, targetId: string, config?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetId, config);
  }
};

// Existing Vercel Analytics function
export const trackEarlyAccessClick = (location: string, element: string) => {
  track('early_access_click', {
    location,
    element,
    timestamp: new Date().toISOString(),
  });

  // Also track with Google Analytics
  gtag('event', 'early_access_click', {
    event_category: 'engagement',
    event_label: `${location}_${element}`,
    location: location,
    element: element,
  });
};

// Google Analytics event tracking functions
export const trackAudioPlay = (lectureId: string, lectureTitle: string) => {
  gtag('event', 'audio_play', {
    event_category: 'media',
    event_label: lectureTitle,
    lecture_id: lectureId,
    lecture_title: lectureTitle,
  });
};

export const trackAudioProgress = (lectureId: string, lectureTitle: string, currentTime: number, duration: number) => {
  const progressPercent = Math.round((currentTime / duration) * 100);
  
  gtag('event', 'audio_progress', {
    event_category: 'media',
    event_label: lectureTitle,
    lecture_id: lectureId,
    lecture_title: lectureTitle,
    current_time: currentTime,
    duration: duration,
    progress_percent: progressPercent,
  });
};

export const trackAudioPause = (lectureId: string, lectureTitle: string, currentTime: number, duration: number) => {
  gtag('event', 'audio_pause', {
    event_category: 'media',
    event_label: lectureTitle,
    lecture_id: lectureId,
    lecture_title: lectureTitle,
    current_time: currentTime,
    duration: duration,
  });
};

export const trackTabSelection = (lectureId: string, lectureTitle: string, tabName: string) => {
  gtag('event', 'tab_selection', {
    event_category: 'navigation',
    event_label: `${lectureTitle}_${tabName}`,
    lecture_id: lectureId,
    lecture_title: lectureTitle,
    tab_name: tabName,
  });
};

export const trackAIDiscussionClick = (lectureId: string, lectureTitle: string, location: string) => {
  gtag('event', 'ai_discussion_click', {
    event_category: 'engagement',
    event_label: `${lectureTitle}_${location}`,
    lecture_id: lectureId,
    lecture_title: lectureTitle,
    location: location,
  });
}; 