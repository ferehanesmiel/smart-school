import { Users, CheckCircle, XCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const attendanceData = [
  { name: 'Mon', present: 450, absent: 50 },
  { name: 'Tue', present: 460, absent: 40 },
  { name: 'Wed', present: 455, absent: 45 },
  { name: 'Thu', present: 470, absent: 30 },
  { name: 'Fri', present: 465, absent: 35 },
  { name: 'Sat', present: 480, absent: 20 },
  { name: 'Sun', present: 490, absent: 10 },
];

const recentNotifications = [
  { id: 1, student: 'Alice Johnson', time: '08:15 AM', status: 'Sent' },
  { id: 2, student: 'Bob Smith', time: '08:30 AM', status: 'Delivered' },
  { id: 3, student: 'Charlie Brown', time: '09:00 AM', status: 'Failed' },
  { id: 4, student: 'Diana Prince', time: '09:15 AM', status: 'Delivered' },
];

const announcements = [
  { id: 1, title: 'Parent-Teacher Meeting', date: 'Oct 15, 2023', content: 'The annual parent-teacher meeting will be held next Friday.' },
  { id: 2, title: 'Science Fair Registration', date: 'Oct 12, 2023', content: 'Registration for the upcoming science fair is now open.' },
  { id: 3, title: 'School Closed', date: 'Oct 10, 2023', content: 'School will be closed on Monday due to a public holiday.' },
  { id: 4, title: 'New Library Books', date: 'Oct 08, 2023', content: 'A new batch of books has arrived in the library.' },
  { id: 5, title: 'Sports Day Practice', date: 'Oct 05, 2023', content: 'Sports day practice will begin from next week.' },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students Today</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">500</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Present Students</p>
            <p className="text-3xl font-bold text-secondary mt-1">450</p>
          </div>
          <div className="bg-secondary/10 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-secondary" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Absent Students</p>
            <p className="text-3xl font-bold text-red-500 mt-1">50</p>
          </div>
          <div className="bg-red-50 p-3 rounded-full">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend (Last 7 Days)</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="present" name="Present" stroke="#32CD32" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="absent" name="Absent" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Parent Notifications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Student Name</th>
                  <th scope="col" className="px-6 py-3">Time</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentNotifications.map((notif, index) => (
                  <tr key={notif.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{notif.student}</td>
                    <td className="px-6 py-4">{notif.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notif.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        notif.status === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {notif.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-96">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
          </div>
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-accent pl-4 py-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-semibold text-gray-900">{announcement.title}</h3>
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
