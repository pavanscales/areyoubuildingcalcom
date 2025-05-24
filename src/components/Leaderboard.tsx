import React, { useState, useEffect } from 'react';
import { fetchCalcomPRs, fetchCalcomIssues, fetchCalcomCommits } from '../utils/githubApi';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('Pull Requests');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        let result = [];
        if (activeTab === 'Pull Requests') {
          result = await fetchCalcomPRs();
        } else if (activeTab === 'Issues') {
          result = await fetchCalcomIssues();
        } else if (activeTab === 'Commits') {
          result = await fetchCalcomCommits();
        }
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load leaderboard data.');
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <div className="bg-black min-h-screen text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold">
            Are you as locked in as Cal.com contributors?
          </h1>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-white text-xl font-semibold">{activeTab} Leaderboard</h2>
            <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
              {['Pull Requests', 'Issues', 'Commits'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-gray-500 p-4 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-600 p-4 text-center">{error}</p>
            ) : data.length === 0 ? (
              <p className="text-gray-500 p-4 text-center">No data available.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="text-left py-3 px-4 text-gray-400 font-medium">
                      #
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-gray-400 font-medium">
                      User
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-gray-400 font-medium">
                      Title
                    </th>
                    <th scope="col" className="text-left py-3 px-4 text-gray-400 font-medium">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const user = item.user || item.commit?.author || {};
                    const title = item.title || item.commit?.message || 'N/A';
                    const date = item.created_at || item.commit?.author?.date || '';
                    return (
                      <tr key={item.id || index} className="border-b border-gray-800">
                        <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                        <td className="py-3 px-4 text-gray-300">@{user.login || user.name || 'Unknown'}</td>
                        <td className="py-3 px-4 text-gray-300">{title}</td>
                        <td className="py-3 px-4 text-gray-300">
                          {date ? new Date(date).toLocaleDateString() : 'Unknown'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>📂 README.md</p>
          <p className="text-blue-500 mt-2">areyoulocked.in © 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
