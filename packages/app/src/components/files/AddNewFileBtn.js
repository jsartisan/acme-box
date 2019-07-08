import React from 'react';
import { Mutation } from 'react-apollo';
import { Icon, message, Menu } from 'antd';
import { withRouter } from 'react-router-dom';

import { GET_ITEMS, ADD_ITEM } from 'graphql/queries';

const AddNewFileBtn = ({ match, history, location, onClick, ...menuProps }) => {
  const fileInputRef = React.createRef();
  const triggerInputFile = () => fileInputRef.current.click();
  const parent = match.params.folder ? match.params.folder : '';

  /**
   * on file upload, hit addItem api
   *
   * @param {*} e domEvent
   * @param {*} addItem mutation function
   */
  const onFileUpload = (e, addItem) => {
    const selectedFile = e.target.files[0];

    addItem({
      variables: {
        name: selectedFile.name,
        parent: parent,
        isFile: true,
      },
    });
  };

  /**
   * on add file succes,
   * add the file in cache
   *
   * @param {*} cache graphQL cache
   * @param {*} object response object
   */
  const onAddFileSuccess = (cache, { data: { addItem } }) => {
    const { items } = cache.readQuery({
      query: GET_ITEMS(parent),
    });

    cache.writeQuery({
      query: GET_ITEMS(parent),
      data: { items: items.concat([addItem]) },
    });

    message.success('File added successfully');
  };

  return (
    <Menu.Item
      {...menuProps}
      className="d-flex align-items-center"
      onClick={() => {
        onClick();
        triggerInputFile();
      }}
    >
      <Mutation
        mutation={ADD_ITEM}
        update={onAddFileSuccess}
        onError={error => {
          console.log(error);
        }}
      >
        {(addItem, { data }) => (
          <>
            <Icon type="file" className="mr-2" />
            <span>File</span>
            <input ref={fileInputRef} type="file" className="d-none" onChange={e => onFileUpload(e, addItem)} />
          </>
        )}
      </Mutation>
    </Menu.Item>
  );
};

export default withRouter(AddNewFileBtn);
