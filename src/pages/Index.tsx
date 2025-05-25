
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

const getPositionIcon = (pos: number): string =>
  ['👑', '🥈', '🥉'][pos - 1] ?? `#${pos}`;

const getDefaultAvatar = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=000000&color=fff&size=32`;

const UserRow: React.FC<{ user: UserCounts; position: number }> = React.memo(({ user, position }) => {
  const icon = getPositionIcon(position);
  return (
    <tr className="border-b border-gray-800 hover:bg-gradient-to-r hover:from-gray-900 hover:to-gray-800 transition duration-300 transform hover:scale-[1.01] cursor-pointer">
      <td className="py-3 px-2 sm:px-4 text-center text-sm sm:text-base">
        {icon.startsWith('#') ? (
          <span className="text-gray-500">{icon}</span>
        ) : (
          <span>{icon}</span>
        )}
      </td>
      <td className="py-3 px-2 sm:px-4">
        <div className="flex items-center gap-3 max-w-[150px] sm:max-w-none">
          <img
            src={user.avatar || getDefaultAvatar(user.username)}
            alt={user.username}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-900 object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getDefaultAvatar(user.username);
            }}
          />
          <span className="text-white font-semibold text-sm truncate">{user.username}</span>
        </div>
      </td>
      <td className="py-3 px-2 sm:px-4 text-center text-sm">{user.prCount}</td>
      <td className="py-3 px-2 sm:px-4 text-center text-sm">{user.issueCount}</td>
      <td className="py-3 px-2 sm:px-4 text-center text-sm">{user.commitCount}</td>
      <td className="py-3 px-2 sm:px-4 text-center font-semibold text-white text-sm">{user.totalCount}</td>
    </tr>
  );
});

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<UserCounts[]>([]);
  const [period, setPeriod] = useState<Period>('daily');

  const getNestedDate = useCallback((obj: any, path: string): Date | null => {
    return path.split('.').reduce((val, key) => (val ? val[key] : null), obj) ? new Date(path.split('.').reduce((val, key) => (val ? val[key] : null), obj)) : null;
  }, []);

  const getDateRange = useCallback((period: Period): [Date, Date] => {
    const now = new Date();
    if (period === 'daily') {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return [start, end];
    }
    if (period === 'weekly') {
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      return [start, end];
    }
    return [new Date(0), now];
  }, []);

  const filterByPeriod = useCallback(
    (items: any[], dateKey: string): any[] => {
      const [start, end] = getDateRange(period);
      return items.filter((item) => {
        const createdAt = getNestedDate(item, dateKey);
        return createdAt && createdAt >= start && createdAt < end;
      });
    },
    [getDateRange, getNestedDate, period]
  );

  useEffect(() => {
    let canceled = false;

    (async () => {
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

        const countsMap = new Map<string, UserCounts>();

        const addCount = (username: string, avatar: string, type: 'pr' | 'issue' | 'commit') => {
          if (!countsMap.has(username)) {
            countsMap.set(username, {
              username,
              avatar,
              prCount: 0,
              issueCount: 0,
              commitCount: 0,
              totalCount: 0,
            });
          }
          const user = countsMap.get(username)!;
          if (type === 'pr') user.prCount++;
          else if (type === 'issue') user.issueCount++;
          else if (type === 'commit') user.commitCount++;
          user.totalCount++;
        };

        filteredPRs.forEach((pr) => addCount(pr.user.login, pr.user.avatar_url, 'pr'));
        filteredIssues.forEach((issue) => addCount(issue.user.login, issue.user.avatar_url, 'issue'));
        filteredCommits.forEach((commit) => {
          const username = commit.author?.login || commit.commit.author.name || 'Unknown';
          const avatar = commit.author?.avatar_url || '';
          addCount(username, avatar, 'commit');
        });

        const sorted = [...countsMap.values()].sort((a, b) => b.totalCount - a.totalCount);
        setLeaderboard(sorted);
      } catch (err) {
        if (!canceled) {
          setError('Failed to load leaderboard data');
          console.error(err);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    })();

    return () => {
      canceled = true;
    };
  }, [filterByPeriod]);

  const topUser = useMemo(() => leaderboard[0]?.username || 'pavanscales', [leaderboard]);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      <header className="bg-black border-b border-gray-700 px-4 sm:px-8 py-5 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="text-white font-mono text-base sm:text-lg">areyoubuildingcalcom</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <h1 className="text-center text-2xl sm:text-3xl text-white mb-8 sm:mb-10 font-semibold tracking-tight">
          Are you as Building in as <span className="text-blue-500">@{topUser.slice(0, 8)}</span>?
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {(['daily', 'weekly'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md font-semibold transition duration-300 text-sm ${
                period === p
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        <section className="bg-black rounded-xl shadow-lg overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-10 text-gray-400 font-medium">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500 font-medium">{error}</div>
            ) : (
              <table className="w-full table-auto min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 sm:px-4 text-gray-500 font-semibold">Position</th>
                    <th className="text-left py-3 px-2 sm:px-4 text-gray-500 font-semibold">User</th>
                    <th className="text-center py-3 px-2 sm:px-4 text-gray-500 font-semibold">PRs</th>
                    <th className="text-center py-3 px-2 sm:px-4 text-gray-500 font-semibold">Issues</th>
                    <th className="text-center py-3 px-2 sm:px-4 text-gray-500 font-semibold">Commits</th>
                    <th className="text-center py-3 px-2 sm:px-4 text-gray-500 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <UserRow key={user.username} user={user} position={index + 1} />
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
