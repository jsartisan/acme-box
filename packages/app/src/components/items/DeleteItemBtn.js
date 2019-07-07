import React from 'react';
import { Mutation } from 'react-apollo';
import { message, Icon, Modal } from 'antd';

import { DELETE_ITEM, GET_ITEMS } from 'graphql/queries';

const { confirm } = Modal;

export default function DeleteItemBtn({ item }) {
  /**
   * on click delete item button, show the confirm alerr
   *
   * @param {*} deleteItem
   */
  const onClick = deleteItem => {
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

  /**
   * on delete item, update cache
   */
  const onDeleteItem = (cache, { data: { deleteItem } }) => {
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
  };

  return (
    <Mutation
      mutation={DELETE_ITEM}
      update={onDeleteItem}
      onError={error => {
        console.log(error);
      }}
    >
      {(deleteItem, { data }) => (
        <div onClick={() => onClick(deleteItem)}>
          <Icon type="delete" className="mr-2" />
          <span>Delete</span>
        </div>
      )}
    </Mutation>
  );
}
