import moment from 'moment';
import React, { useState } from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';

import DeleteItemBtn from 'components/items/DeleteItemBtn';
import EditItemDrawer from 'components/items/EditItemDrawer';

const ItemListItem = ({ item, history }) => {
  /**
   * hooks for edit item drawer
   */
  const [isEditItemDrawerVisible, setEditItemDrawerVisible] = useState(false);

  /**
   * on click item
   *
   * @param {*} e
   */
  const onClick = e => {
    if (item.isFile === false) {
      history.push(`/${item.id}`);
    }

    return;
  };

  /**
   * opens EditItemDrawer
   *
   * @param {*} domEvent
   */
  const onClickEditBtn = domEvent => {
    domEvent.stopPropagation();

    setEditItemDrawerVisible(true);
  };

  /**
   * edit menu for item
   */
  const menu = (
    <Menu>
      <Menu.Item key="0" className="d-flex align-items-center" onClick={({ domEvent }) => onClickEditBtn(domEvent)}>
        <Icon type="edit" className="mr-2" />
        <span>Edit</span>
      </Menu.Item>

      <Menu.Item key="1" className="d-flex align-items-center" onClick={({ domEvent }) => domEvent.stopPropagation()}>
        <DeleteItemBtn item={item} />
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="p-3 rounded shadow-sm mb-3 w-100 d-flex align-items-center items-list__item" onClick={onClick}>
        <div className="flex-grow-1 p-1">
          <Icon
            type={item.isFile ? 'file' : 'folder'}
            theme="twoTone"
            twoToneColor={item.isFile ? '#0095ff' : '#52c41a'}
          />
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
