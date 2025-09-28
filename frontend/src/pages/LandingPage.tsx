import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  SparklesIcon,
  UserGroupIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Code Generation',
      description: 'Generate React components, pages, and full applications using natural language descriptions.'
    },
    {
      icon: CodeBracketIcon,
      title: 'Advanced Code Editor',
      description: 'Full-featured Monaco editor with syntax highlighting, autocomplete, and real-time error checking.'
    },
    {
      icon: UserGroupIcon,
      title: 'Real-time Collaboration',
      description: 'Work together with your team in real-time with live cursors, chat, and synchronized editing.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'One-Click Deployment',
      description: 'Deploy your applications instantly to Vercel, Netlify, or other popular hosting platforms.'
    },
    {
      icon: BoltIcon,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant previews, hot reloading, and efficient bundling.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with automated backups and version control integration.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CodeBracketIcon className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Lovable Clone</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Build web apps with
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}AI magic
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Create stunning web applications using natural language. Our AI-powered platform 
              generates clean, production-ready code while you focus on your ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary text-lg px-8 py-4 rounded-xl"
              >
                Start Building for Free
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 rounded-xl">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-1"></div>
              <div className="relative bg-gray-900 rounded-2xl p-1 shadow-2xl">
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-green-400 font-mono text-sm">
                    <p className="mb-2">💬 "Create a modern landing page for a SaaS product"</p>
                    <p className="text-blue-400 mb-4">🤖 Generating React component with Tailwind CSS...</p>
                    <div className="bg-gray-700 rounded p-4 text-gray-300">
                      <p className="text-purple-400">import React from 'react';</p>
                      <p className="text-blue-400">import { CheckIcon } from '@heroicons/react/24/outline';</p>
                      <p className="mt-2 text-yellow-400">const LandingPage = () => {'{'}...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to build amazing apps
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to accelerate your development workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card p-8 hover:shadow-lg transition-shadow">
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your development workflow?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of developers who are building faster with AI
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-lg"
            >
              Get Started Free
              <RocketLaunchIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CodeBracketIcon className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold">Lovable Clone</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Lovable Clone. Built with ❤️ for developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;