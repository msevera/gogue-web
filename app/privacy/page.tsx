import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} className="w-20 h-6 md:w-[120px] md:h-8" />
            </a>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/roadmap"
              className="block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </a>
            <a
              href="/support"
              className="block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Support
            </a>
          </div>
        </div>
      </header>

      {/* Privacy Policy Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="text-sm text-gray-600 mb-8">
            <p><strong>Last updated:</strong> October 16, 2025</p>
            <p><strong>Effective date:</strong> October 16, 2025</p>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            Welcome to Gogue ("we," "our," "us").
          </p>

          <p className="text-lg text-gray-700 mb-8">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our mobile application ("App") and website <a href="https://gogue.ai" className="text-blue-500 hover:text-blue-600">https://gogue.ai</a> (collectively, the "Services").
          </p>

          <p className="text-lg text-gray-700 mb-8">
            By using Gogue, you agree to this Privacy Policy. If you do not agree, please discontinue using our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">1. Information We Collect</h2>
          <p className="text-lg text-gray-700 mb-6">
            We collect and process information to operate effectively, provide personalized experiences, and improve Gogue.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">a. Information You Provide</h3>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li><strong>Account information:</strong> Name, email address, or other optional details you provide when creating an account or contacting us.</li>
            <li><strong>User input:</strong> Text or queries you submit to generate AI-based audio lectures.</li>
            <li><strong>Preferences:</strong> Topics, interests, and learning goals configured in the app.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">b. Automatically Collected Information</h3>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li><strong>Usage data:</strong> App interactions, listening activity, and feature usage.</li>
            <li><strong>Device and technical data:</strong> Device model, operating system, app version, and IP address (used for analytics, security, and diagnostics).</li>
            <li><strong>Crash and performance data:</strong> Used to improve reliability and fix issues.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">c. Cookies and Tracking</h3>
          <p className="text-lg text-gray-700 mb-6">
            On our website, cookies or similar technologies may be used for analytics and functionality. You can disable cookies in your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">2. How We Use Information</h2>
          <p className="text-lg text-gray-700 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li>Provide, maintain, and improve the App</li>
            <li>Generate personalized audio lessons and recommendations</li>
            <li>Analyze performance and usage trends</li>
            <li>Communicate with users regarding updates, support, or technical issues</li>
            <li>Ensure security and prevent misuse</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            We do not sell or rent personal information to third parties.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">3. Legal Basis for Processing (GDPR)</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you are located in the European Economic Area (EEA) or the United Kingdom, our legal basis for processing your data includes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li><strong>Performance of a contract:</strong> To deliver the Services you request</li>
            <li><strong>Consent:</strong> For personalization and analytics (you may withdraw consent anytime)</li>
            <li><strong>Legitimate interests:</strong> To improve and secure our Services</li>
            <li><strong>Legal obligations:</strong> When required by law</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">4. Third-Party Services</h2>
          <p className="text-lg text-gray-700 mb-4">We may use third-party providers to support our operations, including:</p>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li>AI content generation: For processing lecture requests</li>
            <li>Analytics and crash reporting: Such as Firebase, Amplitude, or similar tools</li>
            <li>Cloud infrastructure: Secure hosting and data storage</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            All third parties process data under strict confidentiality and comply with privacy standards.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">5. Data Retention</h2>
          <p className="text-lg text-gray-700 mb-4">We retain your information only as long as necessary to:</p>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li>Provide and maintain our Services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            When data is no longer needed, it is securely deleted or anonymized.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">6. International Data Transfers</h2>
          <p className="text-lg text-gray-700 mb-6">
            Your information may be processed and stored on servers outside your country.
            We ensure appropriate safeguards are in place, such as Standard Contractual Clauses, to protect your privacy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">7. Your Rights</h2>
          <p className="text-lg text-gray-700 mb-4">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Restrict or object to processing</li>
            <li>Request data portability</li>
            <li>Withdraw consent</li>
          </ul>
          <p className="text-lg text-gray-700 mb-6">
            To exercise these rights, please contact us (see Contact Information below).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">8. California Consumer Rights (CCPA / CPRA)</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you are a California resident, you have the right to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
            <li>Know what personal information we collect and how it's used</li>
            <li>Request deletion of your personal data</li>
            <li>Opt out of the sale or sharing of your information (we do not sell data)</li>
            <li>Be free from discrimination for exercising these rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">9. Security</h2>
          <p className="text-lg text-gray-700 mb-6">
            We apply industry-standard measures to protect your data, including encryption in transit, limited access, and secure storage.
            No method of transmission over the internet is completely secure, but we take all reasonable precautions to safeguard your data.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">10. Children's Privacy</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our Services are not directed toward children under 13, and we do not knowingly collect information from them.
            If you believe a child has provided us data, please contact us to have it deleted.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">11. Changes to This Policy</h2>
          <p className="text-lg text-gray-700 mb-6">
            We may update this Privacy Policy periodically.
            Updates will appear on this page with a new "Last updated" date.
            Significant changes may also be communicated in-app or via notification.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">12. Contact Information</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you have questions, concerns, or privacy-related requests, please <a href="mailto:michael.svr@gmail.com" className="text-blue-500 hover:text-blue-600">contact us</a>
          </p>        
        </div>
      </main>
    </div>
  );
}
