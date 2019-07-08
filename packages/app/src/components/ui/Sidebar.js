import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Dropdown, Menu } from 'antd';

import Logo from 'components/ui/Logo';
import AddNewFileBtn from 'components/files/AddNewFileBtn';
import NewFolderDrawer from 'components/folders/NewFolderDrawer';

const Sidebar = ({ match }) => {
  /**
   * hooks for new folder drawer
   */
  const [isNewFolderDrawerVisible, setNewFolderDrawerVisible] = useState(false);

  /**
   * dropdown menu for new button
   */
  const menu = (
    <Menu>
      <Menu.ItemGroup title="Add new">
        <AddNewFileBtn key="0" />

        <Menu.Item key="1" className="d-flex align-items-center" onClick={() => setNewFolderDrawerVisible(true)}>
          <Icon type="folder" className="mr-2" />
          <span>Folder</span>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div className="c-sidebar">
      <div className="c-sidebar__container p-4 d-flex flex-column">
        <div className="flex-grow-1">
          <Logo />
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="primary" size="large" className="o-button--success w-100 mt-4" icon={'plus'}>
              New
            </Button>
          </Dropdown>

          <ul className="mt-4 c-sidebar__menu">
            <li>
              <NavLink exact to="/" className="active">
                <Icon type="folder" />
                <span>My Box</span>
              </NavLink>
            </li>
          </ul>
          <NewFolderDrawer visible={isNewFolderDrawerVisible} onClose={() => setNewFolderDrawerVisible(false)} />
        </div>
        <footer>
          <small className="text-muted">&copy; Copyright 2018, AcmeBox</small>
        </footer>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
