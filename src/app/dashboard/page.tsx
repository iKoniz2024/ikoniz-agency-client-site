// app/dashboard/page.tsx
import React from 'react';

export default function Dashboard(): JSX.Element {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen">
      <h1 className="p-2 text-2xl font-semibold text-white rounded bg-sky-600 w-max">
        Dashboard
      </h1>
      <p>Welcome to your dashboard!</p>
      {/* Add your dashboard content here */}
    </div>
  );
}
