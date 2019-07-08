import React from 'react';
import { Skeleton, Empty } from 'antd';
import { Query } from 'react-apollo';

import Animate from 'components/ui/Animate';
import ItemList from 'components/items/ItemList';
import { GET_ITEMS, GET_ITEM } from 'graphql/queries';
import ItemListBreadcrumb from 'components/items/ItemListBreadcrumb';

export default function VisibleItemList({ parent }) {
  return (
    <Query query={GET_ITEMS(parent)}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="mt-5">
              <Animate>
                <Skeleton active avatar paragraph={{ rows: 1 }} />
                <Skeleton active avatar paragraph={{ rows: 1 }} />
                <Skeleton active avatar paragraph={{ rows: 1 }} />
                <Skeleton active avatar paragraph={{ rows: 1 }} />
                <Skeleton active avatar paragraph={{ rows: 1 }} />
              </Animate>
            </div>
          );

        if (loading === false && error) {
          return (
            <div className="pt-5 mt-5">
              <Empty description="Oops! Something went wrong." />
            </div>
          );
        }

        return (
          <Animate className="mt-4">
            <ItemListBreadcrumb parent={parent} />
            <ItemList items={data.items} />
          </Animate>
        );
      }}
    </Query>
  );
}
