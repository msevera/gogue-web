'use client';
import Image from "next/image";
import Link from "next/link";

export default function Support() {
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Support Request - Gogue");
    const body = encodeURIComponent("Hi Michael,\n\nI need help with:\n\n");
    const mailtoLink = `mailto:michael.svr@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} className="w-20 h-6 md:w-[120px] md:h-8" />
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/roadmap"
              className="block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </Link>
            <Link
              href="/support"
              className="block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Support
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Need Help?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help you get the most out of Gogue. Reach out to us with any questions, feedback, or issues you might have.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email Support */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Support</h3>
            <p className="text-gray-600 mb-6">
              Get personalized help directly from our team. We typically respond within 24 hours.
            </p>
            <button
              onClick={handleEmailClick}
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </button>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Common Questions</h3>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">How do I get early access?</h4>
                <p className="text-sm text-gray-600">Click the &ldquo;Get early access&rdquo; button on our homepage and fill out the form.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">When will Gogue be available?</h4>
                <p className="text-sm text-gray-600">We&apos;re currently in development. Check our roadmap for the latest updates.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">What books will be available?</h4>
                <p className="text-sm text-gray-600">We&apos;re starting with popular self-growth and business books, with more being added regularly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you can&apos;t find what you&apos;re looking for, don&apos;t hesitate to reach out. We&apos;re committed to providing excellent support to all our users.
          </p>
          <button
            onClick={handleEmailClick}
            className="inline-flex items-center px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
