import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  PlusIcon, 
  CodeBracketIcon, 
  RocketLaunchIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CodeBracketIcon className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Lovable Clone</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName || user?.username}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Profile"
                >
                  <Cog6ToothIcon className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || user?.username}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to build something amazing? Start a new project or continue working on an existing one.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CodeBracketIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Projects
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <RocketLaunchIcon className="w-8 h-8 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Deployed Apps
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    0
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="card card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium text-sm">AI</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    AI Credits
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {user?.credits || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card card-body mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group">
              <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                New React App
              </p>
            </button>

            <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group">
              <CodeBracketIcon className="w-8 h-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                AI Component
              </p>
            </button>

            <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 group-hover:bg-purple-200 rounded flex items-center justify-center">
                <span className="text-gray-400 group-hover:text-purple-600 text-xs font-bold">TPL</span>
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                From Template
              </p>
            </button>

            <button className="p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors group">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 group-hover:bg-orange-200 rounded flex items-center justify-center">
                <span className="text-gray-400 group-hover:text-orange-600 text-xs font-bold">⬆</span>
              </div>
              <p className="text-sm font-medium text-gray-600 group-hover:text-orange-600">
                Import Project
              </p>
            </button>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
          </div>
          <div className="card-body">
            <div className="text-center py-12">
              <CodeBracketIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first project with AI assistance.
              </p>
              <button className="btn-primary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Your First Project
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;