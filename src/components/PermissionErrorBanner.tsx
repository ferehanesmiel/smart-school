import React from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface PermissionErrorBannerProps {
  onClose: () => void;
}

export default function PermissionErrorBanner({ onClose }: PermissionErrorBannerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] max-w-md bg-white border-l-4 border-red-500 shadow-2xl rounded-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900">Firestore Permission Denied</h3>
            <div className="mt-1 text-sm text-gray-600 space-y-2">
              <p>
                Your Firebase project's security rules are preventing the app from reading or writing data.
              </p>
              <p className="font-medium text-gray-800">To fix this:</p>
              <ol className="list-decimal ml-4 space-y-1 text-xs">
                <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Firebase Console <ExternalLink className="h-3 w-3" /></a></li>
                <li>Select your project <strong>smart-school-53db1</strong></li>
                <li>Go to <strong>Firestore Database</strong> &gt; <strong>Rules</strong></li>
                <li>Paste the following rules and click <strong>Publish</strong>:</li>
              </ol>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-[10px] font-mono overflow-x-auto border border-gray-200">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`}
              </pre>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
