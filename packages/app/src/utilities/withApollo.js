import React from 'react';
import cookie from 'cookie';
import ls from 'local-storage';

import initApollo from './initApollo';

export default App => {
  return class WithData extends React.Component {
    constructor(props) {
      super(props);

      this.apolloClient = initApollo(
        {},
        {
          getToken: () => {
            const authToken = localStorage.getItem('authToken');

            return authToken;
          },
        }
      );
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
