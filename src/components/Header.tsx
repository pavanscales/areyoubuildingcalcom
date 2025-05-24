
import React from 'react';

const Header = () => {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-white font-medium">
          areyoulocked.in
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors">
            Sign in
          </button>
          <button className="text-gray-300 hover:text-white transition-colors">
            🌙
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
