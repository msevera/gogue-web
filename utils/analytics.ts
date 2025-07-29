import { track } from '@vercel/analytics';

export const trackEarlyAccessClick = (location: string, element: string) => {
  track('early_access_click', {
    location,
    element,
    timestamp: new Date().toISOString(),
  });
}; 