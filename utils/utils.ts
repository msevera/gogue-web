export const formatTime = (seconds: number, munutesOnly?: boolean) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  if (munutesOnly) {   
    return `${minutes + 1}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}