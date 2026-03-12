import { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Loader2, Zap, Clock } from 'lucide-react';
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
  subscribeRTDBStudents, 
  subscribeRTDBAttendance, 
  subscribeRTDBLogs,
  handleRFIDScan,
  RTDBStudent,
  RTDBAttendance,
  RTDBLog
} from '../lib/db';

export default function Home() {
  const [students, setStudents] = useState<RTDBStudent[]>([]);
  const [attendance, setAttendance] = useState<RTDBAttendance[]>([]);
  const [logs, setLogs] = useState<(RTDBLog & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const unsubStudents = subscribeRTDBStudents(setStudents);
    const unsubAttendance = subscribeRTDBAttendance(today, setAttendance);
    const unsubLogs = subscribeRTDBLogs(setLogs);

    // Initial loading state
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => {
      unsubStudents();
      unsubAttendance();
      unsubLogs();
      clearTimeout(timer);
    };
  }, [today]);

  // Calculate stats
  const presentCount = attendance.length;
  const totalStudents = students.length;
  const absentCount = Math.max(0, totalStudents - presentCount);

  const simulateScan = async () => {
    if (students.length === 0) return;
    setSimulating(true);
    // Pick a random student
    const randomStudent = students[Math.floor(Math.random() * students.length)];
    const result = await handleRFIDScan(randomStudent.rfid_uid, 'WEB_SIMULATOR');
    if (result.success) {
      console.log(`Simulated scan for ${result.student}`);
    } else {
      console.log(`Simulation failed: ${result.message}`);
    }
    setSimulating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
        <button 
          onClick={simulateScan}
          disabled={simulating}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-orange-500 transition-colors shadow-sm disabled:opacity-50"
        >
          {simulating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          Simulate RFID Scan
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Registered</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Attendance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{today}</span>
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
              <tbody className="divide-y divide-gray-100">
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-gray-400">No attendance records for today yet.</td>
                  </tr>
                ) : (
                  attendance.map((record) => (
                    <tr key={record.rfid_uid} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{record.name}</td>
                      <td className="px-6 py-4">{record.time}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Recent Device Logs</h2>
          </div>
          <div className="p-6 overflow-y-auto flex-1 space-y-4 max-h-[400px]">
            {logs.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No device logs found.</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-l-2 border-primary/30 pl-4 py-1">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-gray-900">RFID: {log.rfid_uid}</p>
                      <span className="text-xs text-gray-500">
                        {log.time ? new Date(log.time).toLocaleTimeString() : 'Just now'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Device: {log.deviceID}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

