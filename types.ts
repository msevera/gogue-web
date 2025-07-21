// Type definitions
export interface LectureImage {
  webp: string;
  color: string;
}

export interface LectureAudio {
  stream: string;
  duration: number;
}

export interface LectureAnnotation {
  title: string;
}

export interface LectureSection {
  annotations: LectureAnnotation[];
}

export interface Lecture {
  id: string;
  topic: string;
  title: string;
  overview?: string;
  audio: LectureAudio;
  image: LectureImage;
  sections?: LectureSection[];
}