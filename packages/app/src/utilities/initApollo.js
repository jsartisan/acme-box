import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import resolvers from 'graphql/resolvers';

let apolloClient = null;

function create(initialState, { getToken, fetchOptions }) {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    credentials: 'same-origin',
    fetchOptions,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode: false,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    resolvers,
  });
}

export default function initApollo(initialState, options) {
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
