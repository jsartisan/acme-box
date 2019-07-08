import React from 'react';

export default function ItemListHeader() {
  return (
    <header className="mb-2 d-flex">
      <div className="flex-grow-1 px-3">
        <small className="text-muted">Name</small>
      </div>
      <div className="text-center">
        <small className="text-muted">Last modified</small>
      </div>
      <div style={{ width: 80 }} />
    </header>
  );
}
