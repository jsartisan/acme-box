import React from 'react';

import ItemListItem from 'components/items/ItemListItem';
import ItemListEmpty from 'components/items/ItemListEmpty';

export default function ItemList({ items }) {
  return (
    <div className="mt-3">
      {items.length === 0 && <ItemListEmpty />}
      {items.length > 0 && (
        <>
          <header className="mb-2 d-flex">
            <div className="flex-grow-1 px-3">
              <small className="text-muted">Name</small>
            </div>
            <div className="text-center">
              <small className="text-muted">Last modified</small>
            </div>
            <div style={{ width: 80 }} />
          </header>
          {items.map(item => (
            <ItemListItem item={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
}
