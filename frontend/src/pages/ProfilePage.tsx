import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeftIcon,
  UserIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    username: user?.username || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'billing', label: 'Billing', icon: CreditCardIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-md"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <CodeBracketIcon className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Profile Settings</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                  } group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full text-left`}
                >
                  <tab.icon
                    className={`${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                  />
                  <span className="truncate">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="mt-8 lg:mt-0 lg:col-span-9">
            <div className="card">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="card-header">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                        <p className="text-sm text-gray-500">
                          Update your personal information and preferences.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="input-field mt-1"
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="input-field mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="input-field mt-1"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-field mt-1"
                          disabled
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Email cannot be changed. Contact support if you need to update it.
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary"
                        >
                          {loading ? (
                            <LoadingSpinner size="sm" color="white" />
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div>
                  <div className="card-header">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCardIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Billing & Subscription</h3>
                        <p className="text-sm text-gray-500">
                          Manage your subscription and billing information.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="space-y-6">
                      {/* Current Plan */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900 capitalize">
                              {user?.plan} Plan
                            </h4>
                            <p className="text-sm text-gray-600">
                              {user?.plan === 'free' 
                                ? 'Perfect for getting started'
                                : 'Advanced features for professionals'
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">
                              {user?.plan === 'free' ? '$0' : '$29'}
                            </div>
                            <div className="text-sm text-gray-500">per month</div>
                          </div>
                        </div>
                      </div>

                      {/* AI Credits */}
                      <div>
                        <h4 className="text-base font-medium text-gray-900 mb-3">AI Credits</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Available Credits</span>
                            <span className="text-lg font-semibold text-gray-900">{user?.credits}</span>
                          </div>
                          <div className="mt-2 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min((user?.credits || 0) / 100 * 100, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Credits reset monthly with your subscription
                          </p>
                        </div>
                      </div>

                      {/* Upgrade Button */}
                      {user?.plan === 'free' && (
                        <div className="border-t border-gray-200 pt-6">
                          <button className="btn-primary">
                            Upgrade to Pro
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Other tabs placeholder */}
              {(activeTab === 'notifications' || activeTab === 'security') && (
                <div>
                  <div className="card-header">
                    <h3 className="text-lg font-medium text-gray-900 capitalize">
                      {activeTab}
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        {activeTab === 'notifications' ? <BellIcon className="w-12 h-12 mx-auto" /> : <ShieldCheckIcon className="w-12 h-12 mx-auto" />}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {activeTab === 'notifications' ? 'Notification Settings' : 'Security Settings'}
                      </h3>
                      <p className="text-gray-600">
                        This section is coming soon. Check back later for updates.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;