import React, { useState } from 'react';
import { GraduationCap, ArrowRight, ShieldCheck, Zap, Bell, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      let userMessage = "An error occurred during authentication";
      
      if (err.code === 'auth/invalid-credential') {
        userMessage = "Invalid email or password. Please check your credentials or create a new account.";
      } else if (err.code === 'auth/email-already-in-use') {
        userMessage = "This email is already registered. Please sign in instead.";
      } else if (err.code === 'auth/weak-password') {
        userMessage = "Password should be at least 6 characters.";
      } else if (err.code === 'auth/invalid-email') {
        userMessage = "Please enter a valid email address.";
      } else if (err.message.includes('auth/invalid-credential')) {
        userMessage = "Invalid email or password. Please check your credentials or create a new account.";
      }
      
      setError(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  New Version 2.0 is out
                </span>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  The smartest way to manage your <span className="text-primary">School</span>
                </h1>
                <p className="mt-6 text-lg text-gray-500">
                  Streamline attendance, student records, and parent communication with our all-in-one platform. Built for modern educators and administrators.
                </p>
                
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Secure Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Zap className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Real-time Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <Bell className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Instant Alerts</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sign In Form */}
            <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-2xl sm:shadow-2xl border border-gray-100"
              >
                <div className="px-4 py-8 sm:px-10">
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                      <GraduationCap className="h-10 w-10" />
                      Smart School
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          {error}
                        </div>
                      )}
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="admin@school.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <button 
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-medium text-primary hover:text-blue-500"
                          >
                            {isLogin ? "Need an account?" : "Already have an account?"}
                          </button>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <>
                              {isLogin ? 'Sign in' : 'Sign up'}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-6 sm:px-10 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-500">
                    By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to run your school</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Powerful tools designed to simplify complex administrative tasks.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Attendance Tracking', desc: 'Real-time logs with instant parent notifications via SMS or Email.', icon: Zap, color: 'text-yellow-500' },
              { title: 'Student Records', desc: 'Comprehensive database for student profiles, classes, and performance.', icon: GraduationCap, color: 'text-blue-500' },
              { title: 'Teacher Portals', desc: 'Dedicated space for teachers to manage their classes and subjects.', icon: ShieldCheck, color: 'text-green-500' },
            ].map((feature, i) => (
              <div key={i} className="relative rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`mb-4 inline-block rounded-lg bg-gray-50 p-3 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

