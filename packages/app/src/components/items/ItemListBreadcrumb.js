import React from 'react';
import { Query } from 'react-apollo';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { GET_ITEM } from 'graphql/queries';

export default function ItemListBreadcrumb({ parent, current }) {
  if (parent === '')
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <Icon type="home" />
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );

  return (
    <Query query={GET_ITEM(parent)}>
      {({ loading, error, data }) => {
        if (loading) return false;

        if (data) {
          return (
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">
                  <Icon type="home" />
                </Link>
              </Breadcrumb.Item>
              {data.item.ancestors.map((item, index) => (
                <Breadcrumb.Item key={`breadcrumb-${index}`}>
                  <Link to={`/${item.id}`}>
                    <span>{item.name}</span>
                  </Link>
                </Breadcrumb.Item>
              ))}
              <Breadcrumb.Item key={`breadcrumb-${data.item.id}`}>
                <Link to={`/${data.item.id}`}>
                  <span>{data.item.name}</span>
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          );
        }

        if (error) {
          return (
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link>
                  <Icon type="home" />
                </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          );
        }
      }}
    </Query>
  );
}
