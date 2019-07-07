import React from 'react';

import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';

export default function App({ children }) {
  return (
    <div className="d-flex h-100">
      <div className="position-relative" style={{ minWidth: '300px' }}>
        <Sidebar />
      </div>
      <div className="p-4 w-100">
        <Header />
        {children}
      </div>
    </div>
  );
}
