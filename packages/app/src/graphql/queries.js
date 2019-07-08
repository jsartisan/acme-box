import gql from 'graphql-tag';

export const GET_ITEM = id => gql`
{
  item(id: "${id}") {
    id
    name
    isFile
    createdAt
    parent
    ancestors {
      id
      name
    }
  }
}
`;

export const GET_ITEMS = parent => gql`
{
  items(parent: "${parent}") {
    id
    name
    isFile
    createdAt
    parent
    ancestors {
      id
      name
    }
  }
}
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;

export const EDIT_ITEM = gql`
  mutation editItem($name: String!, $id: String!) {
    editItem(name: $name, id: $id) {
      id
      name
      isFile
      parent
      createdAt
      ancestors {
        id
        name
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($name: String!, $parent: String!, $isFile: Boolean!) {
    addItem(name: $name, parent: $parent, isFile: $isFile) {
      id
      name
      isFile
      parent
      createdAt
      ancestors {
        id
        name
      }
    }
  }
`;
