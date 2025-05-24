import React from 'react';
import namingData from './data.json';

export default function AdminPanel() {
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <pre className="bg-gray-100 p-2">{JSON.stringify(namingData, null, 2)}</pre>
    </div>
);
}
