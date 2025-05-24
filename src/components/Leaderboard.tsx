
import React, { useState } from 'react';
import UserRow from './UserRow';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('Weekly');

  const weeklyLeaderboardData = [
    {
      position: 1,
      username: '@dmztdhruv',
      avatar: 'https://ui-avatars.com/api/?name=dmztdhruv&background=374151&color=fff&size=32',
      timeToday: '1688m',
      languages: ['TypeScript', 'CSS', 'SVG', 'Less', 'JSON', 'Nix', 'Shell']
    },
    {
      position: 2,
      username: '@munali_xd',
      avatar: 'https://ui-avatars.com/api/?name=munali_xd&background=374151&color=fff&size=32',
      timeToday: '1136m',
      languages: ['JavaScript', 'TypeScript', 'JSON', 'HTML', 'CSS', 'INI']
    },
    {
      position: 3,
      username: '@rohitsxx',
      avatar: 'https://ui-avatars.com/api/?name=rohitsxx&background=374151&color=fff&size=32',
      timeToday: '1119m',
      languages: ['Python', 'TypeScript', 'Shell', 'Lua', 'Markdown', 'JSON', 'Delphi']
    },
    {
      position: 4,
      username: '@tkirnit',
      avatar: 'https://ui-avatars.com/api/?name=tkirnit&background=374151&color=fff&size=32',
      timeToday: '1018m',
      languages: ['TypeScript', 'JSON', 'Markdown', 'Smarty', 'CSS', 'Java Properties', 'JavaScript']
    },
    {
      position: 5,
      username: '@ryro_bgs',
      avatar: 'https://ui-avatars.com/api/?name=ryro_bgs&background=374151&color=fff&size=32',
      timeToday: '996m',
      languages: ['CSS', 'C++', 'Java', 'Python', 'Markdown', 'JSON', 'YAML']
    },
    {
      position: 6,
      username: '@sina_savs',
      avatar: 'https://ui-avatars.com/api/?name=sina_savs&background=374151&color=fff&size=32',
      timeToday: '973m',
      languages: ['TypeScript', 'Python', 'JSON', 'HTML', 'TOML', 'JavaScript', 'YAML']
    },
    {
      position: 7,
      username: '@rohitsxx',
      avatar: 'https://ui-avatars.com/api/?name=rohitsxx&background=374151&color=fff&size=32',
      timeToday: '933m',
      languages: ['TypeScript', 'Svelte', 'CSS', 'Delphi', 'Text', 'CSS', 'JSON']
    },
    {
      position: 8,
      username: '@tx_syk',
      avatar: 'https://ui-avatars.com/api/?name=tx_syk&background=374151&color=fff&size=32',
      timeToday: '913m',
      languages: ['TypeScript', 'Lua', 'Nix', 'SVG', 'Shell', 'Text', 'R']
    },
    {
      position: 9,
      username: '@codearyan',
      avatar: 'https://ui-avatars.com/api/?name=codearyan&background=374151&color=fff&size=32',
      timeToday: '877m',
      languages: ['TypeScript', 'JavaScript', 'Prisma', 'JSON', 'CSS', 'HTML']
    },
    {
      position: 10,
      username: '@shealondev',
      avatar: 'https://ui-avatars.com/api/?name=shealondev&background=374151&color=fff&size=32',
      timeToday: '677m',
      languages: ['TypeScript', 'CSS', 'Prisma', 'HTML', 'JSON', 'Markdown', 'JavaScript']
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
            <h2 className="text-white text-xl font-semibold">Weekly Leaderboard</h2>
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
                {weeklyLeaderboardData.map((user) => (
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
