import React from 'react';
import { Skeleton, Empty } from 'antd';
import { Query } from 'react-apollo';

import { GET_ITEMS } from 'graphql/queries';
import Animate from 'components/ui/Animate';
import ItemList from 'components/items/ItemList';

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
              <Empty description={error.message} />
            </div>
          );
        }

        return (
          <Animate className="mt-4">
            <h6>My Box</h6>
            <ItemList items={data.items} />
          </Animate>
        );
      }}
    </Query>
  );
}
