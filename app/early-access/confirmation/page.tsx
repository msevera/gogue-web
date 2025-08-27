import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function EarlyAccessConfirmationPage() {
  return (
    <>
      <Script id="facebook-pixel-complete-registration" strategy="afterInteractive">
        {`
          fbq('track', 'CompleteRegistration');
        `}
      </Script>
      <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} />
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/roadmap"
              className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎉 You’re on the list!</h1>
        <p className="text-lg text-gray-700">
          Thanks for signing up for early access to Gogue. Invitations will be sent out soon — we can’t wait for you to try it.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
    </>
  );
}


