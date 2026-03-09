import { useState } from 'react';
import { Save, Upload, Shield, Bell, Palette, Building2 } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'general' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Building2 className="h-5 w-5" />
              School Info
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Bell className="h-5 w-5" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'users' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Shield className="h-5 w-5" />
              User Management
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'theme' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Palette className="h-5 w-5" />
              Appearance
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">School Information</h2>
              
              <div className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700">School Name</label>
                  <input type="text" defaultValue="Smart School Academy" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea rows={3} defaultValue="123 Education Lane, Learning City, 12345" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                  <input type="email" defaultValue="admin@smartschool.edu" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                      <span className="text-gray-400 font-medium">Logo</span>
                    </div>
                    <button type="button" className="flex items-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                      <Upload className="h-4 w-4" />
                      Change Logo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Notification Preferences</h2>
              
              <div className="space-y-4 max-w-2xl">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Default Delivery Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input type="radio" name="delivery" className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <span className="text-sm text-gray-700">Email Only</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="delivery" className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <span className="text-sm text-gray-700">SMS Only</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="radio" name="delivery" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <span className="text-sm text-gray-700">Both (Email & SMS)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Trigger Events</h3>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Student is marked absent</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Student is marked late</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">New announcement posted</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">Weekly attendance summary</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">User Management</h2>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Manage roles and permissions for school staff.</p>
                
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin User</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Administrator</td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button className="text-primary hover:text-blue-700">Edit</button></td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Teacher</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Teacher</td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button className="text-primary hover:text-blue-700">Edit</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <button className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Invite New User
                </button>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Appearance</h2>
              
              <div className="space-y-4 max-w-2xl">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Color Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-primary rounded-lg p-4 cursor-pointer relative">
                      <div className="absolute top-2 right-2 h-3 w-3 bg-primary rounded-full"></div>
                      <div className="h-10 w-full bg-primary rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">Default Blue</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                      <div className="h-10 w-full bg-indigo-600 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">Indigo</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                      <div className="h-10 w-full bg-emerald-600 rounded mb-2"></div>
                      <p className="text-sm font-medium text-center">Emerald</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
