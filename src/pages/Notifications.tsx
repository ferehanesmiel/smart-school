import { useState } from 'react';
import { Search, RefreshCw, Mail, Smartphone } from 'lucide-react';

const initialNotifications = [
  { id: 1, date: '2023-10-25', student: 'Alice Johnson', status: 'Delivered', type: 'Email', time: '08:15 AM' },
  { id: 2, date: '2023-10-25', student: 'Bob Smith', status: 'Failed', type: 'SMS', time: '08:30 AM' },
  { id: 3, date: '2023-10-25', student: 'Charlie Brown', status: 'Delivered', type: 'Email', time: '09:00 AM' },
  { id: 4, date: '2023-10-24', student: 'Diana Prince', status: 'Delivered', type: 'SMS', time: '09:15 AM' },
  { id: 5, date: '2023-10-24', student: 'Eve Davis', status: 'Pending', type: 'Email', time: '10:00 AM' },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? notif.date === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  const handleResend = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'Pending' } : n));
    // Simulate network request
    setTimeout(() => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'Delivered' } : n));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Parent Notifications</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Search student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="date"
              className="block w-full sm:w-auto px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border bg-white text-gray-700"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.map((notif, index) => (
                <tr key={notif.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{notif.date}</div>
                    <div className="text-sm text-gray-500">{notif.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{notif.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      {notif.type === 'Email' ? <Mail className="h-4 w-4 text-blue-500" /> : <Smartphone className="h-4 w-4 text-green-500" />}
                      {notif.type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
                      notif.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      notif.status === 'Failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {notif.status === 'Pending' && <RefreshCw className="h-3 w-3 animate-spin" />}
                      {notif.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleResend(notif.id)}
                      disabled={notif.status === 'Pending'}
                      className="text-primary hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-end gap-1 ml-auto"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Resend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredNotifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No notifications found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
