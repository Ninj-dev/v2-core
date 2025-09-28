import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  PlayIcon,
  ShareIcon,
  Cog6ToothIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-md"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CodeBracketIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">My Awesome Project</h1>
                  <p className="text-sm text-gray-400">React App</p>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <button className="btn-secondary text-sm">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </button>
              
              <button className="btn-primary text-sm">
                <PlayIcon className="w-4 h-4 mr-2" />
                Preview
              </button>
              
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              Files
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-1">
              {/* Sample file tree */}
              <div className="px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                📁 src
              </div>
              <div className="pl-4 space-y-1">
                <div className="px-2 py-1 text-sm text-blue-400 hover:bg-gray-700 rounded cursor-pointer">
                  📄 App.jsx
                </div>
                <div className="px-2 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded cursor-pointer">
                  📄 index.js
                </div>
                <div className="px-2 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded cursor-pointer">
                  📄 App.css
                </div>
              </div>
              <div className="px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                📁 public
              </div>
              <div className="pl-4">
                <div className="px-2 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded cursor-pointer">
                  📄 index.html
                </div>
              </div>
              <div className="px-2 py-1 text-sm text-gray-400 hover:bg-gray-700 rounded cursor-pointer">
                📄 package.json
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 px-4">
            <div className="flex space-x-1">
              <div className="px-4 py-2 bg-gray-700 text-white text-sm rounded-t border-t-2 border-blue-500">
                App.jsx ×
              </div>
              <div className="px-4 py-2 text-gray-400 text-sm hover:text-white hover:bg-gray-700 rounded-t cursor-pointer">
                index.js
              </div>
            </div>
          </div>

          {/* Code Editor Placeholder */}
          <div className="flex-1 bg-gray-900 p-4">
            <div className="h-full bg-gray-800 rounded-lg border border-gray-600 p-4 font-mono text-sm">
              <div className="text-purple-400">import React from 'react';</div>
              <div className="text-yellow-400 mt-2">function App() {'{'}</div>
              <div className="text-white ml-4 mt-1">return (</div>
              <div className="text-blue-400 ml-8 mt-1">&lt;div className="App"&gt;</div>
              <div className="text-white ml-12 mt-1">&lt;header className="App-header"&gt;</div>
              <div className="text-green-400 ml-16 mt-1">&lt;h1&gt;Welcome to My Project&lt;/h1&gt;</div>
              <div className="text-gray-400 ml-16 mt-1">&lt;p&gt;Built with Lovable Clone&lt;/p&gt;</div>
              <div className="text-white ml-12 mt-1">&lt;/header&gt;</div>
              <div className="text-blue-400 ml-8 mt-1">&lt;/div&gt;</div>
              <div className="text-white ml-4 mt-1">);</div>
              <div className="text-yellow-400 mt-1">{'}'}</div>
              <div className="text-purple-400 mt-2">export default App;</div>
              
              <div className="mt-8 text-gray-500">
                <p>// Monaco Editor will be integrated here</p>
                <p>// Features:</p>
                <p>// - Syntax highlighting</p>
                <p>// - IntelliSense</p>
                <p>// - Error checking</p>
                <p>// - Real-time collaboration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
              AI Assistant
            </h2>
          </div>
          
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">AI</span>
                  </div>
                  <span className="text-sm font-medium">AI Assistant</span>
                </div>
                <p className="text-sm text-gray-300">
                  Hello! I'm here to help you build your project. You can ask me to:
                </p>
                <ul className="text-sm text-gray-400 mt-2 space-y-1">
                  <li>• Generate components</li>
                  <li>• Fix bugs</li>
                  <li>• Explain code</li>
                  <li>• Add features</li>
                </ul>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-white">Generate Component</div>
                  <div className="text-xs text-gray-400 mt-1">Create a new React component</div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-white">Improve Code</div>
                  <div className="text-xs text-gray-400 mt-1">Optimize current file</div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <div className="text-sm font-medium text-white">Add Tests</div>
                  <div className="text-xs text-gray-400 mt-1">Generate unit tests</div>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask AI anything..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="btn-primary px-3 py-2 text-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;