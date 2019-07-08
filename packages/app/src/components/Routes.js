import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';

const history = createBrowserHistory();

const Routes = props => {
  return (
    <Router history={history}>
      <Route path="/:folder?" component={HomePage} />
    </Router>
  );
};

export default Routes;
