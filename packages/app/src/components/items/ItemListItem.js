import moment from 'moment';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { Icon, Menu, Dropdown, Modal, message } from 'antd';
import { withRouter } from 'react-router-dom';

import EditItemDrawer from 'components/items/EditItemDrawer';

const { confirm } = Modal;

const GET_ITEMS = parent => gql`
  {
    items(parent: "${parent}") {
    id
    name
    isFile
    createdAt
  }
}`;

const DELETE_ITEM = gql`
  mutation deleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;

const ItemListItem = ({ item, history }) => {
  const [isEditItemDrawerVisible, setEditItemDrawerVisible] = useState(false);
  const onClick = e => {
    if (item.isFile === false) {
      history.push(`/${item.id}`);
    }

    return;
  };

  const onClickDeleteBtn = deleteItem => {
    confirm({
      title: `Are you sure delete this ${item.isFile ? 'file' : 'folder'}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteItem({ variables: { id: item.id } });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClickEditBtn = domEvent => {
    domEvent.stopPropagation();

    setEditItemDrawerVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" className="d-flex align-items-center" onClick={({ domEvent }) => onClickEditBtn(domEvent)}>
        <Icon type="edit" className="mr-2" />
        <span>Edit</span>
      </Menu.Item>

      <Menu.Item key="1" className="d-flex align-items-center" onClick={({ domEvent }) => domEvent.stopPropagation()}>
        <Mutation
          mutation={DELETE_ITEM}
          update={(cache, { data: { deleteItem } }) => {
            const { items } = cache.readQuery({
              query: GET_ITEMS(item.parent ? item.parent : ''),
            });

            const index = items.findIndex(i => i.id === item.id);
            const copy = items.slice();

            if (index > -1) {
              copy.splice(index, 1);
            }

            cache.writeQuery({
              query: GET_ITEMS(item.parent ? item.parent : ''),
              data: { items: copy },
            });
            message.success('Item Deleted successfully');
          }}
          onError={error => {
            console.log(error);
          }}
        >
          {(deleteItem, { data }) => (
            <div onClick={() => onClickDeleteBtn(deleteItem)}>
              <Icon type="delete" className="mr-2" />
              <span>Delete</span>
            </div>
          )}
        </Mutation>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="p-3 rounded shadow-sm mb-3 w-100 d-flex align-items-center items-list__item" onClick={onClick}>
        <div className="flex-grow-1 p-1">
          <Icon type={item.isFile ? 'file' : 'folder'} theme="twoTone" />
          <span className="ml-3">{item.name}</span>
        </div>
        <div className="text-muted text-center items-list__itemDate">
          {moment.unix(item.createdAt / 1000).fromNow()}
        </div>
        <div className="text-right">
          <Dropdown overlay={menu} trigger={['click']} onClick={e => e.stopPropagation()}>
            <Icon type="more" className="mx-3" />
          </Dropdown>
        </div>
      </div>
      <EditItemDrawer visible={isEditItemDrawerVisible} onClose={() => setEditItemDrawerVisible(false)} item={item} />
    </>
  );
};

export default withRouter(ItemListItem);
