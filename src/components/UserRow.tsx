
import React from 'react';
import LanguageBadge from './LanguageBadge';

interface UserRowProps {
  position: number;
  username: string;
  avatar: string;
  timeToday: string;
  languages: string[];
}

const UserRow: React.FC<UserRowProps> = ({ position, username, avatar, timeToday, languages }) => {
  const getPositionIcon = (pos: number) => {
    if (pos === 1) return '👑';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
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
            className="w-8 h-8 rounded-full bg-gray-700"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${username}&background=374151&color=fff&size=32`;
            }}
          />
          <span className="text-white font-medium">{username}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-gray-300 font-medium">
        {timeToday}
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-2">
          {languages.map((lang, index) => (
            <LanguageBadge key={index} language={lang} />
          ))}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
