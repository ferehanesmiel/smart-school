import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const initialClasses = [
  { id: 1, name: '9th Grade Math', teacher: 'Mr. Anderson', day: 'Monday', startTime: '08:00 AM', endTime: '09:00 AM' },
  { id: 2, name: '10th Grade Science', teacher: 'Ms. Davis', day: 'Tuesday', startTime: '09:15 AM', endTime: '10:15 AM' },
  { id: 3, name: '11th Grade English', teacher: 'Mrs. Smith', day: 'Wednesday', startTime: '10:30 AM', endTime: '11:30 AM' },
  { id: 4, name: '12th Grade History', teacher: 'Mr. Johnson', day: 'Thursday', startTime: '11:45 AM', endTime: '12:45 PM' },
];

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Classes Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Class Form */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Class</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Class Name</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" placeholder="e.g. 10th Grade Math" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Assign Teacher</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border bg-white">
                <option>Select Teacher</option>
                <option>Mr. Anderson</option>
                <option>Ms. Davis</option>
                <option>Mrs. Smith</option>
                <option>Mr. Johnson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Day of Week</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border bg-white">
                <option>Select Day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" />
              </div>
            </div>

            <button type="button" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors">
              Add Class
            </button>
          </form>
        </div>

        {/* Classes Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">All Classes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classes.map((cls, index) => (
                  <tr key={cls.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cls.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cls.teacher}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{cls.day}</div>
                      <div className="text-sm text-gray-500">{cls.startTime} - {cls.endTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-1.5 rounded-md">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
