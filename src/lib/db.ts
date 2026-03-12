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
import { 
  ref, 
  onValue, 
  set, 
  push, 
  get, 
  child, 
  update, 
  remove,
  query as rtdbQuery,
  orderByChild,
  equalTo,
  limitToLast,
  serverTimestamp
} from "firebase/database";
import { db, rtdb } from "./firebase";

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
  // New fields for RTDB structure
  grade?: string;
  rfid_uid?: string;
  parent_phone?: string;
  parent_name?: string;
}

export interface RTDBStudent {
  studentID: string;
  name: string;
  grade: string;
  section: string;
  rfid_uid: string;
  parent_phone: string;
  parent_name: string;
}

export interface RTDBAttendance {
  studentID: string;
  name: string;
  time: string;
  status: string;
  rfid_uid: string;
}

export interface RTDBDevice {
  deviceID: string;
  location: string;
  last_seen: any;
}

export interface RTDBLog {
  rfid_uid: string;
  time: any;
  deviceID: string;
}

// ... existing interfaces ...

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

// Realtime Database Functions for Smart School Attendance System

export const subscribeRTDBStudents = (callback: (students: RTDBStudent[]) => void) => {
  const studentsRef = ref(rtdb, 'students');
  return onValue(studentsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const studentsList = Object.keys(data).map(key => ({
        ...data[key],
        studentID: key
      }));
      callback(studentsList);
    } else {
      callback([]);
    }
  });
};

export const addRTDBStudent = async (student: RTDBStudent) => {
  const studentRef = ref(rtdb, `students/${student.studentID}`);
  await set(studentRef, student);
};

export const subscribeRTDBAttendance = (date: string, callback: (attendance: RTDBAttendance[]) => void) => {
  const attendanceRef = ref(rtdb, `attendance/${date}`);
  return onValue(attendanceRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const attendanceList = Object.keys(data).map(key => ({
        ...data[key],
        rfid_uid: key
      }));
      callback(attendanceList);
    } else {
      callback([]);
    }
  });
};

export const subscribeRTDBDevices = (callback: (devices: RTDBDevice[]) => void) => {
  const devicesRef = ref(rtdb, 'devices');
  return onValue(devicesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const devicesList = Object.keys(data).map(key => ({
        ...data[key],
        deviceID: key
      }));
      callback(devicesList);
    } else {
      callback([]);
    }
  });
};

export const subscribeRTDBLogs = (callback: (logs: (RTDBLog & { id: string })[]) => void) => {
  const logsRef = rtdbQuery(ref(rtdb, 'logs'), limitToLast(20));
  return onValue(logsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const logsList = Object.keys(data).map(key => ({
        ...data[key],
        id: key
      })).reverse();
      callback(logsList);
    } else {
      callback([]);
    }
  });
};

// Function to handle RFID scan (simulating what ESP32 would do or processing it)
export const handleRFIDScan = async (rfid_uid: string, deviceID: string) => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  // 1. Log the scan
  const logsRef = ref(rtdb, 'logs');
  const newLogRef = push(logsRef);
  await set(newLogRef, {
    rfid_uid,
    time: serverTimestamp(),
    deviceID
  });

  // 2. Find student by rfid_uid
  const studentsRef = ref(rtdb, 'students');
  const studentQuery = rtdbQuery(studentsRef, orderByChild('rfid_uid'), equalTo(rfid_uid));
  const studentSnapshot = await get(studentQuery);
  
  if (studentSnapshot.exists()) {
    const studentData = Object.values(studentSnapshot.val())[0] as RTDBStudent;
    const studentID = Object.keys(studentSnapshot.val())[0];

    // 3. Check for duplicate scan within 5 minutes
    const attendanceRef = ref(rtdb, `attendance/${dateStr}/${rfid_uid}`);
    const lastAttendanceSnap = await get(attendanceRef);
    
    if (lastAttendanceSnap.exists()) {
      const lastTime = new Date(`${dateStr} ${lastAttendanceSnap.val().time}`);
      const diffMinutes = (now.getTime() - lastTime.getTime()) / (1000 * 60);
      
      if (diffMinutes < 5) {
        console.log("Duplicate scan within 5 minutes. Skipping.");
        return { success: false, message: "Duplicate scan" };
      }
    }

    // 4. Create attendance record
    await set(attendanceRef, {
      studentID,
      name: studentData.name,
      time: timeStr,
      status: 'Present'
    });

    return { success: true, student: studentData.name };
  } else {
    console.log("Student not found for RFID:", rfid_uid);
    return { success: false, message: "Student not found" };
  }
};

// Seed RTDB Data
export const seedRTDBData = async () => {
  const studentsRef = ref(rtdb, 'students');
  const snap = await get(studentsRef);
  if (!snap.exists()) {
    const initialStudents: Record<string, RTDBStudent> = {
      'S1001': { studentID: 'S1001', name: 'Alice Johnson', grade: '10', section: 'A', rfid_uid: 'UID_12345', parent_phone: '123-456-7890', parent_name: 'Bob Johnson' },
      'S1002': { studentID: 'S1002', name: 'Charlie Brown', grade: '9', section: 'B', rfid_uid: 'UID_67890', parent_phone: '234-567-8901', parent_name: 'Lucy Brown' },
      'S1003': { studentID: 'S1003', name: 'Diana Prince', grade: '11', section: 'C', rfid_uid: 'UID_ABCDE', parent_phone: '345-678-9012', parent_name: 'Hippolyta' },
    };
    await set(studentsRef, initialStudents);

    const devicesRef = ref(rtdb, 'devices');
    await set(devicesRef, {
      'ESP32_MAIN_GATE': { deviceID: 'ESP32_MAIN_GATE', location: 'Main Entrance', last_seen: serverTimestamp() }
    });
  }
};
