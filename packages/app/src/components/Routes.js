import React from 'react';
import { Router, Route } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import HomePage from 'pages/HomePage';

export const history = createBrowserHistory();

const Routes = props => {
  return (
    <Router history={history}>
      <Route path="/:folder?" component={HomePage} />
    </Router>
  );
};

export default Routes;
