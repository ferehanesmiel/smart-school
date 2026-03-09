import { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { 
  subscribeStudents, 
  subscribeAttendance, 
  subscribeNotifications, 
  subscribeAnnouncements,
  Student,
  AttendanceLog,
  Notification,
  Announcement
} from '../lib/db';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceLog[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubStudents = subscribeStudents(setStudents);
    const unsubAttendance = subscribeAttendance(setAttendance);
    const unsubNotifications = subscribeNotifications(setNotifications);
    const unsubAnnouncements = subscribeAnnouncements(setAnnouncements);

    // Initial loading state
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => {
      unsubStudents();
      unsubAttendance();
      unsubNotifications();
      unsubAnnouncements();
      clearTimeout(timer);
    };
  }, []);

  // Calculate stats
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(log => log.date === today);
  const presentCount = todayAttendance.filter(log => log.status === 'Present' || log.status === 'Late').length;
  const absentCount = todayAttendance.filter(log => log.status === 'Absent').length;
  const totalStudents = students.length || 500; // Fallback to 500 if no students yet

  // Prepare chart data (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    
    const dayLogs = attendance.filter(log => log.date === dateStr);
    return {
      name: dayName,
      present: dayLogs.filter(l => l.status === 'Present' || l.status === 'Late').length,
      absent: dayLogs.filter(l => l.status === 'Absent').length
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Students</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totalStudents}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Present Today</p>
            <p className="text-3xl font-bold text-secondary mt-1">{presentCount}</p>
          </div>
          <div className="bg-secondary/10 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-secondary" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Absent Today</p>
            <p className="text-3xl font-bold text-red-500 mt-1">{absentCount}</p>
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
            <LineChart data={last7Days} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                {notifications.slice(0, 5).map((notif, index) => (
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

