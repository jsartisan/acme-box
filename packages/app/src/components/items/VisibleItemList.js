import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import ItemList from 'components/items/ItemList';

export default function VisibleItemList({ parent }) {
  return (
    <Query
      query={gql`
        {
          items(parent: "${parent}") {
            id
            name
            isFile
            createdAt
            parent
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div className="mt-4">
            <h6>My Box</h6>
            <ItemList items={data.items} />
          </div>
        );
      }}
    </Query>
  );
}
