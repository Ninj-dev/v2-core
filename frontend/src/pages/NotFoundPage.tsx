import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            404
          </div>
          <div className="mt-4">
            <svg
              className="mx-auto w-32 h-32 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-9a9 9 0 11-9 9 9 9 0 019-9z"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page not found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or the URL might be incorrect.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="btn-secondary inline-flex items-center px-6 py-3 text-base"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Go Back
            </button>
            
            <Link
              to="/"
              className="btn-primary inline-flex items-center px-6 py-3 text-base"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Popular pages
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/dashboard"
                className="text-blue-600 hover:text-blue-500 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-500 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;