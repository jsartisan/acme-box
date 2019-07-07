import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Component } from 'react';

const LOGIN_QUERY = gql`
  {
    me {
      id
      email
      name
    }
  }
`;

export default ChildComponnent => {
  class requireAuth extends Component {
    render() {
      return (
        <Query query={LOGIN_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'Loading...';
            }

            if (error) return `Error! ${error.message}`;

            if (data.me === null) {
              window.location.href = '/login';
            }

            return <ChildComponnent {...this.props} />;
          }}
        </Query>
      );
    }
  }

  return requireAuth;
};
