import React from 'react';

export default function ItemListEmpty() {
  return (
    <div className="text-center items-list__empty">
      <img alt="Add files" src="/images/add_file.svg" />
      <div className="mt-4">
        <p className="small text-muted">Add files to folder</p>
        <p className="small text-muted">Use the 'New' button</p>
      </div>
    </div>
  );
}
