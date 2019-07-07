import React from 'react';

export default function ItemListEmpty() {
  return (
    <div className="text-center">
      <img
        alt="Add files"
        src="/images/add_file.svg"
        style={{
          height: '150px',
          margin: '0 auto',
          width: '100%',
          marginTop: '100px',
        }}
      />
      <div className="mt-4">
        <p className="small text-muted">Add files to folder</p>
        <p className="small text-muted">Use the 'New' button</p>
      </div>
    </div>
  );
}
