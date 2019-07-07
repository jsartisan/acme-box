import React from 'react';
import { render } from 'react-dom';

import Root from './components/Root';

render(<Root />, document.getElementById('root'));

/**
 * enables hot module replacement
 */
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
