'use client';

import Link from 'next/link';

export default function AdminTaskListPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Task List</h1>
          <Link href="/admin" className="text-xs font-bold text-[#0F3D2E] hover:underline">
            ← Back to Admin Studio
          </Link>
        </div>
        <p className="text-sm text-gray-500">Task list management module for internal admin operations.</p>
      </div>
    </div>
  );
}
