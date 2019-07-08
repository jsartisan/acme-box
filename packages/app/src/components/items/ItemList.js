import React from 'react';

import ItemListItem from 'components/items/ItemListItem';
import ItemListEmpty from 'components/items/ItemListEmpty';
import ItemListHeader from 'components/items/ItemListHeader';

export default function ItemList({ items }) {
  return (
    <div className="mt-3">
      {items.length === 0 && <ItemListEmpty />}
      {items.length > 0 && (
        <>
          <ItemListHeader />
          {items.map(item => (
            <ItemListItem item={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
}
