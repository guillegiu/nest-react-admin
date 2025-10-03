import React from 'react';

import LanguageSelector from '../LanguageSelector';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
