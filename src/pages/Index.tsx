import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  fetchCalcomPRs,
  fetchCalcomIssues,
  fetchCalcomCommits,
} from '../utils/githubApi';

type UserCounts = {
  username: string;
  avatar: string;
  prCount: number;
  issueCount: number;
  commitCount: number;
  totalCount: number;
};

type Period = 'daily' | 'weekly';

const getPositionIcon = (pos: number) =>
  pos === 1 ? '👑' : pos === 2 ? '🥈' : pos === 3 ? '🥉' : `#${pos}`;

const UserRow: React.FC<{ user: UserCounts; position: number }> = React.memo(
  ({ user, position }) => {
    const icon = getPositionIcon(position);
    const isNumberIcon = icon.startsWith('#');

    return (
      <tr className="border-b border-gray-800 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 transition-transform duration-200 transform hover:scale-[1.01] cursor-pointer text-xs sm:text-sm">
        <td className="py-2 px-2 sm:px-4 text-gray-300 font-semibold text-lg text-center">
          {isNumberIcon ? (
            <span className="text-gray-500">{icon}</span>
          ) : (
            <span>{icon}</span>
          )}
        </td>
        <td className="py-2 px-2 sm:px-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.username
                )}&background=000&color=fff&size=32`
              }
              alt={user.username}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-900 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.username
                )}&background=000&color=fff&size=32`;
              }}
            />
            <span className="text-white font-semibold tracking-tight text-xs sm:text-sm">
              {user.username}
            </span>
          </div>
        </td>
        <td className="py-2 px-1 sm:px-4 text-center hidden sm:table-cell">
          {user.prCount}
        </td>
        <td className="py-2 px-1 sm:px-4 text-center hidden sm:table-cell">
          {user.issueCount}
        </td>
        <td className="py-2 px-1 sm:px-4 text-center hidden sm:table-cell">
          {user.commitCount}
        </td>
        <td className="py-2 px-2 sm:px-4 text-center font-semibold text-white">
          {user.totalCount}
        </td>
      </tr>
    );
  }
);

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<UserCounts[]>([]);
  const [period, setPeriod] = useState<Period>('daily');

  const getNestedDate = useCallback((obj: any, path: string): Date | null => {
    const val = path.split('.').reduce((acc, key) => (acc ? acc[key] : null), obj);
    return val ? new Date(val) : null;
  }, []);

  const getDateRange = useCallback((p: Period): [Date, Date] => {
    const now = new Date();
    if (p === 'daily') {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return [start, end];
    }
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return [start, end];
  }, []);

  const filterByPeriod = useCallback(
    (items: any[], dateKey: string): any[] => {
      const [start, end] = getDateRange(period);
      return items.filter((item) => {
        const createdAt = getNestedDate(item, dateKey);
        return createdAt ? createdAt >= start && createdAt < end : false;
      });
    },
    [getDateRange, getNestedDate, period]
  );

  useEffect(() => {
    let canceled = false;
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [prs, issues, commits] = await Promise.all([
          fetchCalcomPRs(),
          fetchCalcomIssues(),
          fetchCalcomCommits(),
        ]);
        if (canceled) return;

        const filteredPRs = filterByPeriod(prs, 'created_at');
        const filteredIssues = filterByPeriod(issues, 'created_at');
        const filteredCommits = filterByPeriod(commits, 'commit.author.date');

        const counts = new Map<string, UserCounts>();
        const add = (u: string, a: string, t: 'pr' | 'issue' | 'commit') => {
          if (!counts.has(u)) counts.set(u, { username: u, avatar: a, prCount: 0, issueCount: 0, commitCount: 0, totalCount: 0 });
          const user = counts.get(u)!;
          user[`${t}Count` as 'prCount']++;
          user.totalCount++;
        };

        filteredPRs.forEach((pr) => add(pr.user.login, pr.user.avatar_url, 'pr'));
        filteredIssues.forEach((i) => add(i.user.login, i.user.avatar_url, 'issue'));
        filteredCommits.forEach((c) => {
          const u = c.author?.login || c.commit.author.name || 'Unknown';
          const a = c.author?.avatar_url || '';
          add(u, a, 'commit');
        });

        setLeaderboard(Array.from(counts.values()).sort((a, b) => b.totalCount - a.totalCount));
      } catch {
        if (!canceled) setError('Failed to load leaderboard data');
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    loadData();
    return () => {
      canceled = true;
    };
  }, [filterByPeriod, period]);

  const topUser = useMemo(() => (leaderboard[0]?.username || 'dmztdhruv'), [leaderboard]);
  const handlePeriodChange = useCallback((p: Period) => setPeriod(p), []);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-black border-b border-gray-700 px-4 sm:px-8 py-4 shadow">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-bold text-xl sm:text-2xl">
            Are you building as @{topUser}?
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-4 flex-wrap">
          {(['daily', 'weekly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                period === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-pressed={period === p}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <section className="bg-gray-900 rounded-lg shadow overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">{error}</div>
            ) : (
              <table className="w-full min-w-[500px] table-fixed border-collapse">
                <thead className="text-xs sm:text-sm">
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-2 sm:px-4 text-left text-gray-400">#</th>
                    <th className="py-3 px-2 sm:px-4 text-left text-gray-400">User</th>
                    <th className="py-3 px-1 sm:px-4 text-center text-gray-400 hidden sm:table-cell">PRs</th>
                    <th className="py-3 px-1 sm:px-4 text-center text-gray-400 hidden sm:table-cell">Issues</th>
                    <th className="py-3 px-1 sm:px-4 text-center text-gray-400 hidden sm:table-cell">Commits</th>
                    <th className="py-3 px-2 sm:px-4 text-center text-gray-400">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((u, i) => (
                    <UserRow key={u.username} user={u} position={i + 1} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
