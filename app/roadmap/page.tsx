import Link from "next/link";
import Image from "next/image";
import { Metadata } from 'next';
import { EarlyAccessButton } from "@/components/EarlyAccessButton";

export const metadata: Metadata = {
  title: "Gogue - Product Roadmap.",
  description: "Our journey to revolutionize learning through AI-powered lectures and courses.",
};

export default function Roadmap() {
  const currentFeatures = [
    "Generate 5-10 minute AI-powered audio lectures on any topic instantly",
    "Listen to lectures with synchronized text highlighting for better focus",
    "Seamlessly pause and resume lectures exactly where you left off",
    "Jump to any section by tapping text or using the audio scrubber",
    "Access all your lecture notes in one organized, searchable drawer",
    "Chat with AI about the content at any moment during playback",
    "Review and continue previous AI conversations anytime",
    "Save lectures to your personal library for easy access",
    "Discover daily curated facts (Glimpses) tailored to your interests",
    "Share your favorite lectures with friends and colleagues"
  ];

  const partIFeatures = [
    "Enhanced AI content generation for more engaging and diverse lectures",
    "Upload your own documents, videos, and audio files as lecture sources",
    "Public and private lectures",
    "Rate and provide feedback to help improve lecture quality",
    "Public launch with freemium subscription plans for everyone"
  ];

  const partIIFeatures = [
    "Smart recommendations for related topics and follow-up lectures",
    "AI-generated exercises and assignments to reinforce learning",
    "Visual learning with animated diagrams and explainer videos",
    "Create comprehensive multi-lecture courses on complex subjects",
    "Web based experience"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} className="h-8" />
            </Link>
          </div>
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Product Roadmap
          </h1>
          <p className="text-xl text-gray-600">
            Our journey to revolutionize learning through AI-powered lectures and courses
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {/* Current Features - iOS App */}
          <div className="relative mb-16">
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full font-bold text-lg flex-shrink-0 relative z-10">
                ✓
              </div>
              <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">iOS Mobile App</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-500 text-sm font-semibold rounded-full self-start sm:self-auto">TESTFLIGHT BETA</span>
                </div>
                <p className="text-gray-600 mb-6">Currently available in TestFlight beta with comprehensive learning features</p>

                <div className="grid gap-3">
                  {currentFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Part I - Next Steps */}
          <div className="relative mb-16">
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-blue-300 border-dashed bg-white text-blue-300 rounded-full font-bold text-lg flex-shrink-0 relative z-10">
                I
              </div>
              <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Part I - Next Steps</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full self-start sm:self-auto">PUBLIC LAUNCH</span>
                </div>
                <p className="text-gray-600 mb-6">Planned enhancements and public launch preparation</p>

                <div className="grid gap-3">
                  {partIFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-center w-5 h-5 border border-blue-300 border-dashed bg-white text-blue-400 rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Part II - Future Vision */}
          <div className="relative">
            <div className="flex items-start gap-6">
              <div className="flex items-center justify-center w-12 h-12 border-2 border-blue-300 border-dashed bg-white text-blue-300 rounded-full font-bold text-lg flex-shrink-0 relative z-10">
                II
              </div>
              <div className="flex-1 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Part II - Future Vision</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full self-start sm:self-auto">PLANNED</span>
                </div>
                <p className="text-gray-600 mb-6">Future revolutionary learning experiences and course creation</p>

                <div className="grid gap-3">
                  {partIIFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-center w-5 h-5 border border-blue-300 border-dashed bg-white text-blue-400 rounded-full text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-800 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to be part of our journey?</h3>
          <p className="text-gray-600 mb-8">Get early access and help shape the future of learning</p>
          <EarlyAccessButton
            location="roadmap_page"
            element="roadmap_cta_button"
            className="inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get early access
          </EarlyAccessButton>
        </div>
      </div>
    </div>
  );
} 