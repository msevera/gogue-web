import Image from 'next/image';
import type { Source } from '../types';

interface SourceProps {
  source: Source;
  className?: string;
}

export default function Source({ source, className = '' }: SourceProps) {
  const height = 200;
  const imageWidth = source?.image?.width;
  const imageHeight = source?.image?.height;
  const aspectRatio = imageWidth! / imageHeight!;
  const calculatedWidth = height * aspectRatio;

  return (
    <div className={`flex-col items-start gap-4 ${className} bg-gray-50 rounded-2xl p-4`}>
      {/* <div className="text-sm text-gray-500 mb-2">Based on book</div> */}
      <div className='flex items-start gap-4'>

       
        {/* Source Details */}
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-500 mb-1">Based on book</div>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 md:line-clamp-1">
            {source.title}
          </h3>    
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            by {source.authors.join(', ')}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-3">
            {source.topic}
          </p>
        </div>
        <div
          className="w-[80px] md:w-[100px] relative rounded-lg overflow-hidden"
        //  style={{ backgroundColor: `${source.image?.color}20` }}
        >
          <Image
            src={source.image?.url || '/placeholder-lecture.jpg'}
            alt={source.title}
            width={calculatedWidth}
            height={height}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
