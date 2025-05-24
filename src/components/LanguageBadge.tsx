
import React from 'react';

interface LanguageBadgeProps {
  language: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language }) => {
  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      'TypeScript': 'bg-blue-500',
      'Delphi': 'bg-green-500', 
      'Go': 'bg-cyan-500',
      'Shell': 'bg-teal-500',
      'Svelte': 'bg-orange-500',
      'Dart': 'bg-blue-400',
      'CSS': 'bg-purple-500',
      'HTML': 'bg-pink-500',
      'C++': 'bg-blue-600',
      'Python': 'bg-green-600',
      'JavaScript': 'bg-yellow-500',
      'Text': 'bg-gray-500',
      'JSON': 'bg-gray-400',
      'SVG': 'bg-indigo-500',
      'Markdown': 'bg-red-500'
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
