// Type definitions
export interface LectureImage {
  webp: string;
  color: string;
}

export interface LectureAudio {
  stream: string;
  duration: number;
}

export interface Lecture {
  id: string;
  topic: string;
  title: string;
  audio: LectureAudio;
  image: LectureImage;
}