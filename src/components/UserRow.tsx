import React from 'react';

interface GitHubUserRowProps {
  position: number;
  avatar: string;
  username: string;
  title: string;
  date: string;
  prs: number;      // Add PR count
  commits: number;  // Add commit count
}

const GitHubUserRow: React.FC<GitHubUserRowProps> = ({
  position,
  avatar,
  username,
  title,
  date,
  prs,
  commits,
}) => {
  const getPositionIcon = (pos: number) => {
    if (pos === 1) return '👑';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  return (
    <tr className="border-b border-gray-800 bg-black hover:bg-gray-900 transition-colors">
      <td className="py-4 px-4 text-gray-300 font-medium">
        <span className="flex items-center">
          {typeof getPositionIcon(position) === 'string' && getPositionIcon(position).startsWith('#') ? (
            <span className="text-gray-400">{getPositionIcon(position)}</span>
          ) : (
            <span className="text-xl">{getPositionIcon(position)}</span>
          )}
        </span>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img
            src={avatar}
            alt={username}
            className="w-8 h-8 rounded-full bg-black"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=000000&color=fff&size=32`;
            }}
          />
          <span className="text-white font-medium">@{username}</span>
        </div>
      </td>


      <td className="py-4 px-4 text-gray-400 text-sm">{new Date(date).toLocaleDateString()}</td>
      <td className="py-4 px-4 text-gray-300 font-medium">{prs > 0 ? prs : '-'}</td>
      <td className="py-4 px-4 text-gray-300 font-medium">{commits > 0 ? commits : '-'}</td>
    </tr>
  );
};

export default GitHubUserRow;
