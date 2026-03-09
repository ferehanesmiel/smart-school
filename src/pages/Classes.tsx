import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Loader2, X } from 'lucide-react';
import { subscribeClasses, addClass, deleteClass, updateClass, Class } from '../lib/db';

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    day: '',
    startTime: '',
    endTime: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeClasses((data) => {
      setClasses(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.teacher) return;
    
    setSubmitting(true);
    try {
      if (editingId) {
        await updateClass(editingId, formData);
        setEditingId(null);
      } else {
        await addClass(formData);
      }
      setFormData({
        name: '',
        teacher: '',
        day: '',
        startTime: '',
        endTime: ''
      });
    } catch (error) {
      console.error("Error saving class:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClass(id);
      } catch (error) {
        console.error("Error deleting class:", error);
      }
    }
  };

  const handleEdit = (cls: Class) => {
    if (!cls.id) return;
    setEditingId(cls.id);
    setFormData({
      name: cls.name,
      teacher: cls.teacher,
      day: cls.day,
      startTime: cls.startTime,
      endTime: cls.endTime
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      teacher: '',
      day: '',
      startTime: '',
      endTime: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Classes Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Class Form */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Edit Class' : 'Add New Class'}
            </h2>
            {editingId && (
              <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Class Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" 
                placeholder="e.g. 10th Grade Math" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Assign Teacher</label>
              <select 
                name="teacher"
                value={formData.teacher}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border bg-white"
              >
                <option value="">Select Teacher</option>
                <option value="Mr. Anderson">Mr. Anderson</option>
                <option value="Ms. Davis">Ms. Davis</option>
                <option value="Mrs. Smith">Mrs. Smith</option>
                <option value="Mr. Johnson">Mr. Johnson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Day of Week</label>
              <select 
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border bg-white"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input 
                  type="time" 
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input 
                  type="time" 
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : (editingId ? 'Update Class' : 'Add Class')}
            </button>
          </form>
        </div>

        {/* Classes Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">All Classes</h2>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : (
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
                          <button 
                            onClick={() => handleEdit(cls)}
                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-1.5 rounded-md"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => cls.id && handleDelete(cls.id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded-md"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && classes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No classes found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

