'use client';

import { useState, useMemo, useEffect } from 'react';
import { Lecture } from '@/types';
import { NotesAccessButton } from './NotesAccessButton';
import { WorkbookAccessButton } from './WorkbookAccessButton';
import { trackTabSelection } from '@/utils/analytics';

interface LectureDetailsProps {
  lecture: Lecture;
}

type Tab = 'overview' | 'sections' | 'sources' | 'workbook' | 'notes';

export function LectureDetails({ lecture }: LectureDetailsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  // Track tab selection
  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId);
    trackTabSelection(lecture.id, lecture.title, tabId);
  };



  // Gather all annotations from the research array with unique URLs
  const annotations = useMemo(() => {
    if (!lecture.research || !Array.isArray(lecture.research)) {
      return [];
    }
    const allAnnotations = lecture.research.flatMap(research => research.annotations || []);
    const uniqueUrls = new Set();
    return allAnnotations.filter(annotation => {
      if (uniqueUrls.has(annotation.url)) {
        return false;
      }
      uniqueUrls.add(annotation.url);
      return true;
    });
  }, [lecture.research]);

  // Switch away from sources tab on mobile
  useEffect(() => {
    const checkScreenSize = () => {
      if (activeTab === 'sources' && window.innerWidth < 640) { // 640px is the sm breakpoint
        setActiveTab('overview');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [activeTab]);

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview' },
    { id: 'sections' as Tab, label: 'Sections' },
    { id: 'sources' as Tab, label: 'Sources' },
    { id: 'notes' as Tab, label: 'Notes' },
    { id: 'workbook' as Tab, label: 'Workbook' },
  ];

  return (
    <div
      className="bg-gray-50 rounded-2xl overflow-hidden w-full"
      style={{
        backgroundColor: `${lecture.image?.color}20`,
      }}
    >
      {/* Tab Navigation */}
      <div className="border-b overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{
          borderColor: `${lecture.image?.color}20`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex w-max px-2 sm:px-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`cursor-pointer px-4 sm:px-6 py-4 text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                tab.id === 'sources' ? 'hidden sm:flex' : ''
              } ${activeTab === tab.id
                ? 'text-gray-950 border-b-2'
                : 'text-gray-600 border-b-2 border-transparent hover:text-gray-950'
                }`}
              style={{
                borderBottomColor: activeTab === tab.id ? lecture.image?.color : 'transparent',
                // color: activeTab === tab.id ? lecture.image?.color : 'inherit',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 max-h-[300px] overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="text-gray-700 leading-relaxed">
            {lecture.overview || "This lecture covers key concepts and insights about " + lecture.topic?.toLowerCase() + ", gathered from the best sources on the web."}
          </div>
        )}

        {activeTab === 'sections' && (
          <div>
            {lecture.sections && lecture.sections.length > 0 ? (
              <div className="space-y-4">
                {lecture.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`${index < (lecture.sections?.length || 0) - 1 ? 'mb-4 pb-4 border-b' : ''}`}
                    style={{
                      borderBottomColor: `${lecture.image?.color}20`
                    }}
                  >
                    <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                    <p className="text-gray-500 leading-relaxed">{section.overview}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No sections available for this lecture.</p>
            )}
          </div>
        )}

        {activeTab === 'sources' && (
          <div>
            {annotations && annotations.length > 0 ? (
              <div className="space-y-3">
                {annotations.map((annotation, index) => (
                  <div
                    key={index}
                    className={`${index < (annotations?.length || 0) - 1 ? 'mb-4 pb-4 border-b' : ''}`}
                    style={{
                      borderBottomColor: `${lecture.image?.color}20`
                    }}
                  >
                    <h4 className="font-medium text-gray-900 mb-2">{annotation.title}</h4>
                    <a
                      href={annotation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all transition-colors"
                    >
                      {annotation.url}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No sources available for this lecture.</p>
            )}
          </div>
        )}

        {activeTab === 'workbook' && (
          <div className="text-center py-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Workbook</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get a personalized workbook with audio, exercises and practice problems tailored to this lecture. Enhance your learning with interactive content.
              </p>
            </div>
            <WorkbookAccessButton
              lectureId={lecture.id}
              lectureTitle={lecture.title}
              location="lecture_workbook"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
            >
              Get early access to workbook
            </WorkbookAccessButton>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="text-center py-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Notes</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Take notes while listening to enhance your learning experience. Get early access to unlock this feature.
              </p>
            </div>
            <NotesAccessButton
              lectureId={lecture.id}
              lectureTitle={lecture.title}
              location="lecture_notes"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
            >
              Get early access to take notes
            </NotesAccessButton>
          </div>
        )}
      </div>
    </div>
  );
} 