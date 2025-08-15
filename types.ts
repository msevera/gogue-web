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
  url: string;
}

export interface LectureSection {
  title: string;
  overview: string;
}

export interface LectureResearch {
  annotations: LectureAnnotation[];
}

export interface SourceImage {
  url: string;
  color: string;
  width?: number;
  height?: number;
}

export interface Source {
  id: string;
  title: string;
  authors: string[];
  image: SourceImage;
  topic: string;
}

export interface Lecture {
  id: string;
  topic: string;
  title: string;
  overview?: string;
  audio: LectureAudio;
  image: LectureImage;
  sections?: LectureSection[];
  research?: LectureResearch;
  source?: Source;
}