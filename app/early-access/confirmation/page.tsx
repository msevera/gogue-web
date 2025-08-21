import Image from "next/image";

export default function EarlyAccessConfirmationPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/">
              <Image src="/logo.svg" alt="Gogue" width={120} height={32} />
            </a>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="/roadmap"
              className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm md:text-base"
            >
              Roadmap
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🎉 You’re on the list!</h1>
        <p className="text-lg text-gray-700">
          Thanks for signing up for early access to Gogue. Invitations will be sent out soon — we can’t wait for you to try it.
        </p>
        <div className="mt-10">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
          >
            Back to home
          </a>
        </div>
      </main>
    </div>
  );
}


