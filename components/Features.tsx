import Image from "next/image";

export function Features() {
  return (
    <div className="mb-32">
      {/* Section 1: Lecture Details from Real Sources */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Built on real, credible sources
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Every lecture is carefully crafted using verified information from trusted sources across the web. 
            See exactly where your knowledge comes from with transparent source citations.
          </p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Real-time web research
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Credible source verification
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Transparent citations
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0">
          <div className="w-[280px] h-[580px] bg-black rounded-[35px] p-2 shadow-xl">
            <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
              <Image
                src="/phone/sources1-screen.png"
                alt="Lecture details with real sources"
                width={260}
                height={520}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Section 2: Audio Player & AI Assistant */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-24">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Listen, learn, and interact
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Take notes while listening to your personalized lecture, then interact with an AI assistant 
            that knows your content inside and out. Ask questions via text or voice anytime.
          </p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Real-time note taking
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Voice or text interaction
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Context-aware AI assistant
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0">
          <div className="flex gap-4">
            <div className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src="/phone/player1.png"
                  alt="Audio player with note taking"
                  width={220}
                  height={440}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src="/phone/player2.png"
                  alt="AI assistant interaction"
                  width={220}
                  height={440}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Notes Organization */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-24">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            All your notes in one place
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Never lose track of your learning progress. All your lecture notes are automatically 
            organized and searchable, making it easy to review and build on your knowledge.
          </p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Automatic organization
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Full-text search
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Cross-lecture connections
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0">
          <div className="flex gap-4">
            <div className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src="/phone/notes1.png"
                  alt="Notes list view"
                  width={220}
                  height={440}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src="/phone/notes1.png"
                  alt="Notes detail view"
                  width={220}
                  height={440}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Glimpses Feature */}
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Daily glimpses of knowledge
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Discover fascinating facts and insights about your areas of interest every day. 
            Glimpses keeps you engaged with bite-sized knowledge that sparks curiosity and expands your learning journey.
          </p>
          <ul className="text-lg text-gray-600 space-y-2">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Personalized daily facts
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Category-based insights
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Engaging micro-learning
            </li>
          </ul>
        </div>
        <div className="flex-shrink-0">
          <div className="flex gap-4">
            <div className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src="/phone/glimpses2.png"
                  alt="Notes list view"
                  width={220}
                  height={440}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-[240px] h-[500px] bg-black rounded-[35px] p-2 shadow-xl">
              <div className="w-full h-full bg-gray-900 rounded-[28px] overflow-hidden">
                <Image
                  src="/phone/glimpses1.png"
                  alt="Notes detail view"
                  width={220}
                  height={440}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 