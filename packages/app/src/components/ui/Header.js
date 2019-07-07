import React from 'react';
import { Input, Avatar, Icon, Button } from 'antd';

const Search = Input.Search;

export default function Header() {
  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <Search placeholder="Search" size="large" className="w-50" />
      </div>
      <div>
        <Button type="link">
          <Icon type="setting" style={{ fontSize: '16px', color: 'gray' }} />
        </Button>
        <Avatar className="ml-3" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="large">
          P
        </Avatar>
      </div>
    </div>
  );
}
