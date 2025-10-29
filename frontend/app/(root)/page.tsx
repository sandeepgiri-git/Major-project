export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              AI-Powered
              <span className="block text-indigo-600">Interview Practice</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Master your next technical interview with personalized AI feedback, 
              real-time coding assessments, and industry-specific mock interviews.
            </p>
            <div className="mt-10">
              <a
                href="/signup"
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Start Practicing Free
              </a>
              <a
                href="#features"
                className="ml-4 inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why InterviewAI?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to ace your technical interviews
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Personalized Feedback</h3>
              <p className="mt-2 text-gray-600">
                Get detailed analysis of your answers with AI-powered suggestions for improvement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Real Coding Environment</h3>
              <p className="mt-2 text-gray-600">
                Practice coding problems in a real IDE with syntax highlighting and execution.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Industry-Specific Prep</h3>
              <p className="mt-2 text-gray-600">
                Tailored interview questions for FAANG, startups, finance, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
            Join thousands of candidates who've improved their interview skills with InterviewAI
          </p>
          <div className="mt-10">
            <a
              href="/signup"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-bold hover:bg-indigo-50 transition-colors duration-200 shadow-lg"
            >
              Start Your Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <span className="text-xl font-bold text-indigo-600">InterviewAI</span>
            </div>
            <div className="mt-8 md:mt-0 flex justify-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}