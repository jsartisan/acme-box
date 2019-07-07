import React from 'react';
import withApollo from 'utilities/withApollo';
import { ApolloProvider } from 'react-apollo';

import 'antd/dist/antd.css';

import 'assets/sass/custom.bootstrap.scss';
import 'assets/sass/app.scss';

import Routes from './Routes';

const Root = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);

export default withApollo(Root);
