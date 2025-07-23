export function WhyGogue() {
  return (
    <div className="px-4">
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The internet is full of knowledge. Learning from it should be simple.
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Millions of articles and videos exist—but who has time to sift through it all?
            Gogue turns complex info into short, personalized audio lessons you can absorb anywhere.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">The old way</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Spend hours researching across multiple sources</li>
                    <li>Get overwhelmed by information scatter</li>
                    <li>Need dedicated quiet time to focus</li>
                    <li>Generic content that may not stick</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 512 512" className="w-5 h-5 text-red-600">
                    <path d="M208,512,155.62,372.38,16,320l139.62-52.38L208,128l52.38,139.62L400,320,260.38,372.38Z" />
                    <path d="M88,176,64.43,111.57,0,88,64.43,64.43,88,0l23.57,64.43L176,88l-64.43,23.57Z" />
                    <path d="M400,256l-31.11-80.89L288,144l80.89-31.11L400,32l31.11,80.89L512,144l-80.89,31.11Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">The Gogue way</h3>
                  <ul className="space-y-2">
                    <li>Get a complete 10-minute expert lecture</li>
                    <li>AI curates the best information for you</li>
                    <li>Learn while doing anything, anywhere</li>
                    <li>Ask questions and get instant answers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 