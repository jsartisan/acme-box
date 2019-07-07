import React, { Component } from 'react';

import App from 'components/App';
import VisibleItemList from 'components/items/VisibleItemList';

class HomePage extends Component {
  render() {
    const { match } = this.props;
    const parent = match.params.folder ? match.params.folder : '';

    return (
      <App>
        <VisibleItemList parent={parent} />
      </App>
    );
  }
}

export default HomePage;
