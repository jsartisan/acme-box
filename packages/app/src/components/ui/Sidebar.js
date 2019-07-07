import gql from 'graphql-tag';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { Mutation, withApollo } from 'react-apollo';
import { Icon, Button, Dropdown, Menu, message } from 'antd';

import Logo from 'components/ui/Logo';
import NewFolderDrawer from 'components/folders/NewFolderDrawer';

const GET_ITEMS = parent => gql`
  {
    items(parent: "${parent}") {
    id
    name
    isFile
    parent
    createdAt
  }
}`;

const ADD_FILE = gql`
  mutation addFile($name: String!, $parent: String!) {
    addFile(name: $name, parent: $parent) {
      id
      name
      isFile
      parent
      createdAt
    }
  }
`;

const Sidebar = ({ match }) => {
  const fileInputRef = React.createRef();
  const [isUploading, setIsUploading] = useState(false);
  const triggerInputFile = () => fileInputRef.current.click();

  /**
   * on file upload
   */
  const onFileUpload = (e, addFile) => {
    const selectedFile = e.target.files[0];
    const parent = match.params.folder ? match.params.folder : '';
    setIsUploading(true);

    addFile({
      variables: {
        name: selectedFile.name,
        parent: parent,
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Add new">
        <Menu.Item key="0" className="d-flex align-items-center" onClick={() => triggerInputFile()}>
          <Icon type="file" className="mr-2" />
          <span>File</span>
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Item key="0" className="d-flex align-items-center" onClick={() => setNewFolderDrawerVisible(true)}>
        <Icon type="folder" className="mr-2" />
        <span>Folder</span>
      </Menu.Item>
    </Menu>
  );
  const [isNewFolderDrawerVisible, setNewFolderDrawerVisible] = useState(false);
  const parent = match.params.folder ? match.params.folder : '';

  return (
    <Mutation
      mutation={ADD_FILE}
      update={(cache, { data: { addFile } }) => {
        const { items } = cache.readQuery({
          query: GET_ITEMS(parent),
        });

        cache.writeQuery({
          query: GET_ITEMS(parent),
          data: { items: items.concat([addFile]) },
        });

        setIsUploading(false);
        message.success('File added successfully');
      }}
      onError={error => {
        console.log(error);
      }}
    >
      {(addFile, { data }) => (
        <div className="c-sidebar">
          <div className="c-sidebar__container p-4">
            <Logo />
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="primary" size="large" className="o-button--success w-100 mt-4" icon="plus">
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
            <input ref={fileInputRef} type="file" className="d-none" onChange={e => onFileUpload(e, addFile)} />
            <NewFolderDrawer visible={isNewFolderDrawerVisible} onClose={() => setNewFolderDrawerVisible(false)} />
          </div>
        </div>
      )}
    </Mutation>
  );
};

export default withRouter(withApollo(Sidebar));
