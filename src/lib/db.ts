import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp,
  getDocs,
  where,
  limit
} from "firebase/firestore";
import { db } from "./firebase";

// Types
export interface Student {
  id?: string;
  studentId: string;
  name: string;
  class: string;
  section: string;
  cardId: string;
  email: string;
  phone: string;
  photoUrl?: string;
  createdAt?: any;
}

export interface Teacher {
  id?: string;
  teacherId: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  photoUrl?: string;
  createdAt?: any;
}

export interface Class {
  id?: string;
  name: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
  createdAt?: any;
}

export interface AttendanceLog {
  id?: string;
  date: string;
  student: string;
  class: string;
  status: 'Present' | 'Absent' | 'Late';
  time: string;
  timestamp: any;
}

export interface Notification {
  id?: string;
  date: string;
  student: string;
  status: 'Delivered' | 'Failed' | 'Pending' | 'Sent';
  type: 'Email' | 'SMS';
  time: string;
  timestamp: any;
}

export interface Announcement {
  id?: string;
  title: string;
  date: string;
  content: string;
  timestamp: any;
}

// Collection References
const studentsCol = collection(db, "students");
const teachersCol = collection(db, "teachers");
const classesCol = collection(db, "classes");
const attendanceCol = collection(db, "attendance");
const notificationsCol = collection(db, "notifications");
const announcementsCol = collection(db, "announcements");

let globalErrorHandler: ((error: any) => void) | null = null;

export const setGlobalFirestoreErrorHandler = (handler: (error: any) => void) => {
  globalErrorHandler = handler;
};

const handleError = (error: any, context: string) => {
  console.error(`Firestore Error [${context}]:`, error);
  if (globalErrorHandler) {
    globalErrorHandler(error);
  }
};

// Students
export const subscribeStudents = (callback: (students: Student[]) => void) => {
  const q = query(studentsCol, orderBy("name", "asc"));
  return onSnapshot(q, 
    (snapshot) => {
      const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
      callback(students);
    },
    (error) => handleError(error, "subscribeStudents")
  );
};

export const addStudent = async (student: Omit<Student, "id">) => {
  try {
    return await addDoc(studentsCol, { ...student, createdAt: Timestamp.now() });
  } catch (error) {
    handleError(error, "addStudent");
    throw error;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    return await deleteDoc(doc(db, "students", id));
  } catch (error) {
    handleError(error, "deleteStudent");
    throw error;
  }
};

export const updateStudent = async (id: string, student: Partial<Student>) => {
  try {
    return await updateDoc(doc(db, "students", id), student);
  } catch (error) {
    handleError(error, "updateStudent");
    throw error;
  }
};

// Teachers
export const subscribeTeachers = (callback: (teachers: Teacher[]) => void) => {
  const q = query(teachersCol, orderBy("name", "asc"));
  return onSnapshot(q, 
    (snapshot) => {
      const teachers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
      callback(teachers);
    },
    (error) => handleError(error, "subscribeTeachers")
  );
};

export const addTeacher = async (teacher: Omit<Teacher, "id">) => {
  try {
    return await addDoc(teachersCol, { ...teacher, createdAt: Timestamp.now() });
  } catch (error) {
    handleError(error, "addTeacher");
    throw error;
  }
};

export const deleteTeacher = async (id: string) => {
  try {
    return await deleteDoc(doc(db, "teachers", id));
  } catch (error) {
    handleError(error, "deleteTeacher");
    throw error;
  }
};

export const updateTeacher = async (id: string, teacher: Partial<Teacher>) => {
  try {
    return await updateDoc(doc(db, "teachers", id), teacher);
  } catch (error) {
    handleError(error, "updateTeacher");
    throw error;
  }
};

// Classes
export const subscribeClasses = (callback: (classes: Class[]) => void) => {
  const q = query(classesCol, orderBy("name", "asc"));
  return onSnapshot(q, 
    (snapshot) => {
      const classes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Class));
      callback(classes);
    },
    (error) => handleError(error, "subscribeClasses")
  );
};

export const addClass = async (cls: Omit<Class, "id">) => {
  try {
    return await addDoc(classesCol, { ...cls, createdAt: Timestamp.now() });
  } catch (error) {
    handleError(error, "addClass");
    throw error;
  }
};

export const deleteClass = async (id: string) => {
  try {
    return await deleteDoc(doc(db, "classes", id));
  } catch (error) {
    handleError(error, "deleteClass");
    throw error;
  }
};

export const updateClass = async (id: string, cls: Partial<Class>) => {
  try {
    return await updateDoc(doc(db, "classes", id), cls);
  } catch (error) {
    handleError(error, "updateClass");
    throw error;
  }
};

// Attendance
export const subscribeAttendance = (callback: (logs: AttendanceLog[]) => void) => {
  const q = query(attendanceCol, orderBy("timestamp", "desc"));
  return onSnapshot(q, 
    (snapshot) => {
      const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AttendanceLog));
      callback(logs);
    },
    (error) => handleError(error, "subscribeAttendance")
  );
};

export const addAttendance = async (log: Omit<AttendanceLog, "id" | "timestamp">) => {
  try {
    return await addDoc(attendanceCol, { ...log, timestamp: Timestamp.now() });
  } catch (error) {
    handleError(error, "addAttendance");
    throw error;
  }
};

// Notifications
export const subscribeNotifications = (callback: (notifications: Notification[]) => void) => {
  const q = query(notificationsCol, orderBy("timestamp", "desc"));
  return onSnapshot(q, 
    (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
      callback(notifications);
    },
    (error) => handleError(error, "subscribeNotifications")
  );
};

export const addNotification = async (notification: Omit<Notification, "id" | "timestamp">) => {
  try {
    return await addDoc(notificationsCol, { ...notification, timestamp: Timestamp.now() });
  } catch (error) {
    handleError(error, "addNotification");
    throw error;
  }
};

export const updateNotificationStatus = async (id: string, status: Notification['status']) => {
  try {
    return await updateDoc(doc(db, "notifications", id), { status });
  } catch (error) {
    handleError(error, "updateNotificationStatus");
    throw error;
  }
};

// Announcements
export const subscribeAnnouncements = (callback: (announcements: Announcement[]) => void) => {
  const q = query(announcementsCol, orderBy("timestamp", "desc"));
  return onSnapshot(q, 
    (snapshot) => {
      const announcements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      callback(announcements);
    },
    (error) => handleError(error, "subscribeAnnouncements")
  );
};

export const addAnnouncement = async (announcement: Omit<Announcement, "id" | "timestamp">) => {
  try {
    return await addDoc(announcementsCol, { ...announcement, timestamp: Timestamp.now() });
  } catch (error) {
    handleError(error, "addAnnouncement");
    throw error;
  }
};

// Seed Data Function (to be called once if needed)
export const seedInitialData = async () => {
  const studentsSnap = await getDocs(studentsCol);
  if (studentsSnap.empty) {
    const initialStudents = [
      { studentId: 'S1001', name: 'Alice Johnson', class: '10th', section: 'A', cardId: 'C001', email: 'alice@example.com', phone: '123-456-7890' },
      { studentId: 'S1002', name: 'Bob Smith', class: '9th', section: 'B', cardId: 'C002', email: 'bob@example.com', phone: '234-567-8901' },
      { studentId: 'S1003', name: 'Charlie Brown', class: '10th', section: 'A', cardId: 'C003', email: 'charlie@example.com', phone: '345-678-9012' },
      { studentId: 'S1004', name: 'Diana Prince', class: '11th', section: 'C', cardId: 'C004', email: 'diana@example.com', phone: '456-789-0123' },
    ];
    for (const s of initialStudents) await addStudent(s);
  }

  const teachersSnap = await getDocs(teachersCol);
  if (teachersSnap.empty) {
    const initialTeachers = [
      { teacherId: 'T001', name: 'Mr. Anderson', subject: 'Mathematics', email: 'anderson@example.com', phone: '111-222-3333' },
      { teacherId: 'T002', name: 'Ms. Davis', subject: 'Science', email: 'davis@example.com', phone: '222-333-4444' },
      { teacherId: 'T003', name: 'Mrs. Smith', subject: 'English', email: 'smith@example.com', phone: '333-444-5555' },
      { teacherId: 'T004', name: 'Mr. Johnson', subject: 'History', email: 'johnson@example.com', phone: '444-555-6666' },
    ];
    for (const t of initialTeachers) await addTeacher(t);
  }

  const classesSnap = await getDocs(classesCol);
  if (classesSnap.empty) {
    const initialClasses = [
      { name: '9th Grade Math', teacher: 'Mr. Anderson', day: 'Monday', startTime: '08:00 AM', endTime: '09:00 AM' },
      { name: '10th Grade Science', teacher: 'Ms. Davis', day: 'Tuesday', startTime: '09:15 AM', endTime: '10:15 AM' },
      { name: '11th Grade English', teacher: 'Mrs. Smith', day: 'Wednesday', startTime: '10:30 AM', endTime: '11:30 AM' },
      { name: '12th Grade History', teacher: 'Mr. Johnson', day: 'Thursday', startTime: '11:45 AM', endTime: '12:45 PM' },
    ];
    for (const c of initialClasses) await addClass(c);
  }

  const attendanceSnap = await getDocs(attendanceCol);
  if (attendanceSnap.empty) {
    const initialLogs = [
      { date: '2023-10-25', student: 'Alice Johnson', class: '10th', status: 'Present', time: '08:05 AM' },
      { date: '2023-10-25', student: 'Bob Smith', class: '9th', status: 'Absent', time: '-' },
      { date: '2023-10-25', student: 'Charlie Brown', class: '10th', status: 'Present', time: '08:10 AM' },
      { date: '2023-10-25', student: 'Diana Prince', class: '11th', status: 'Late', time: '08:35 AM' },
      { date: '2023-10-24', student: 'Alice Johnson', class: '10th', status: 'Present', time: '08:02 AM' },
    ];
    for (const l of initialLogs) await addAttendance(l as any);
  }

  const notificationsSnap = await getDocs(notificationsCol);
  if (notificationsSnap.empty) {
    const initialNotifications = [
      { date: '2023-10-25', student: 'Alice Johnson', status: 'Delivered', type: 'Email', time: '08:15 AM' },
      { date: '2023-10-25', student: 'Bob Smith', status: 'Failed', type: 'SMS', time: '08:30 AM' },
      { date: '2023-10-25', student: 'Charlie Brown', status: 'Delivered', type: 'Email', time: '09:00 AM' },
      { date: '2023-10-24', student: 'Diana Prince', status: 'Delivered', type: 'SMS', time: '09:15 AM' },
      { date: '2023-10-24', student: 'Eve Davis', status: 'Pending', type: 'Email', time: '10:00 AM' },
    ];
    for (const n of initialNotifications) await addNotification(n as any);
  }

  const announcementsSnap = await getDocs(announcementsCol);
  if (announcementsSnap.empty) {
    const initialAnnouncements = [
      { title: 'Parent-Teacher Meeting', date: 'Oct 15, 2023', content: 'The annual parent-teacher meeting will be held next Friday.' },
      { title: 'Science Fair Registration', date: 'Oct 12, 2023', content: 'Registration for the upcoming science fair is now open.' },
      { title: 'School Closed', date: 'Oct 10, 2023', content: 'School will be closed on Monday due to a public holiday.' },
      { title: 'New Library Books', date: 'Oct 08, 2023', content: 'A new batch of books has arrived in the library.' },
      { title: 'Sports Day Practice', date: 'Oct 05, 2023', content: 'Sports day practice will begin from next week.' },
    ];
    for (const a of initialAnnouncements) await addAnnouncement(a as any);
  }
};
