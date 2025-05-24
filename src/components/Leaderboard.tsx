
import React, { useState } from 'react';
import UserRow from './UserRow';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  const leaderboardData = [
    {
      position: 1,
      username: '@dmztdhruv',
      avatar: 'https://ui-avatars.com/api/?name=dmztdhruv&background=374151&color=fff&size=32',
      timeToday: '318m',
      languages: ['TypeScript', 'Delphi', 'Go', 'Shell']
    },
    {
      position: 2,
      username: '@rohitsxx',
      avatar: 'https://ui-avatars.com/api/?name=rohitsxx&background=374151&color=fff&size=32',
      timeToday: '306m',
      languages: ['TypeScript', 'Svelte', 'Dart', 'CSS', 'HTML', 'C++', 'Python']
    },
    {
      position: 3,
      username: '@munali_xd',
      avatar: 'https://ui-avatars.com/api/?name=munali_xd&background=374151&color=fff&size=32',
      timeToday: '214m',
      languages: ['JavaScript']
    },
    {
      position: 4,
      username: '@karaan_dev',
      avatar: 'https://ui-avatars.com/api/?name=karaan_dev&background=374151&color=fff&size=32',
      timeToday: '208m',
      languages: ['TypeScript', 'CSS', 'Text', 'JSON', 'SVG']
    },
    {
      position: 5,
      username: '@rusheer_an',
      avatar: 'https://ui-avatars.com/api/?name=rusheer_an&background=374151&color=fff&size=32',
      timeToday: '171m',
      languages: ['JavaScript', 'HTML', 'JSON']
    },
    {
      position: 6,
      username: '@grrql_prttyash',
      avatar: 'https://ui-avatars.com/api/?name=grrql_prttyash&background=374151&color=fff&size=32',
      timeToday: '170m',
      languages: ['TypeScript', 'CSS']
    },
    {
      position: 7,
      username: '@dviesh7',
      avatar: 'https://ui-avatars.com/api/?name=dviesh7&background=374151&color=fff&size=32',
      timeToday: '162m',
      languages: ['TypeScript', 'CSS']
    },
    {
      position: 8,
      username: '@bibek7',
      avatar: 'https://ui-avatars.com/api/?name=bibek7&background=374151&color=fff&size=32',
      timeToday: '136m',
      languages: ['TypeScript', 'JavaScript', 'CSS', 'Markdown']
    },
    {
      position: 9,
      username: '@jsus64',
      avatar: 'https://ui-avatars.com/api/?name=jsus64&background=374151&color=fff&size=32',
      timeToday: '134m',
      languages: ['Svelte', 'TypeScript']
    }
  ];

  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-gray-300 text-2xl mb-8">
            Are you as locked in as <span className="text-blue-400">@dmztdhruv</span> ?
          </h1>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-white text-xl font-semibold">Today's Leaderboard</h2>
            <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('Daily')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'Daily'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setActiveTab('Weekly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'Weekly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Position</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Time Today</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Languages</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <UserRow
                    key={user.position}
                    position={user.position}
                    username={user.username}
                    avatar={user.avatar}
                    timeToday={user.timeToday}
                    languages={user.languages}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            📂 README.md
          </p>
          <p className="text-blue-400 text-sm mt-2">
            areyoulocked.in © 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
