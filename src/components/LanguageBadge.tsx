
import React from 'react';

interface LanguageBadgeProps {
  language: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language }) => {
  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'Python': 'bg-green-500',
      'Java': 'bg-orange-500',
      'C++': 'bg-blue-600',
      'CSS': 'bg-purple-500',
      'HTML': 'bg-pink-500',
      'JSON': 'bg-gray-400',
      'Shell': 'bg-teal-500',
      'Markdown': 'bg-red-500',
      'SVG': 'bg-indigo-500',
      'Less': 'bg-purple-400',
      'Nix': 'bg-blue-400',
      'INI': 'bg-gray-500',
      'Lua': 'bg-purple-600',
      'Delphi': 'bg-green-500',
      'Smarty': 'bg-orange-400',
      'Java Properties': 'bg-orange-600',
      'YAML': 'bg-green-400',
      'TOML': 'bg-gray-600',
      'Svelte': 'bg-orange-500',
      'Text': 'bg-gray-500',
      'Prisma': 'bg-purple-500',
      'R': 'bg-blue-700'
    };
    return colors[lang] || 'bg-gray-500';
  };

  return (
    <span className={`${getLanguageColor(language)} text-white text-xs px-2 py-1 rounded-full font-medium`}>
      {language}
    </span>
  );
};

export default LanguageBadge;
