import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck, Bell, Settings, LogOut } from 'lucide-react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import { seedInitialData, setGlobalFirestoreErrorHandler } from './lib/db';
import PermissionErrorBanner from './components/PermissionErrorBanner';
import Home from './pages/Home';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Notifications from './pages/Notifications';
import SettingsPage from './pages/Settings';
import Landing from './pages/Landing';

function Navigation({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: LayoutDashboard },
    { path: '/students', label: 'Students', icon: Users },
    { path: '/teachers', label: 'Teachers', icon: GraduationCap },
    { path: '/classes', label: 'Classes', icon: BookOpen },
    { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary flex items-center gap-2">
              <GraduationCap className="h-8 w-8" />
              Smart School
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPermissionError, setShowPermissionError] = useState(false);

  useEffect(() => {
    setGlobalFirestoreErrorHandler((error) => {
      if (error?.code === 'permission-denied' || error?.message?.includes('permission-denied')) {
        setShowPermissionError(true);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        seedInitialData().catch(console.error);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <GraduationCap className="h-12 w-12 text-primary animate-bounce" />
          <p className="text-gray-500 font-medium">Loading Smart School...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Landing />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-text font-sans">
        <Navigation onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        {showPermissionError && (
          <PermissionErrorBanner onClose={() => setShowPermissionError(false)} />
        )}
      </div>
    </BrowserRouter>
  );
}


