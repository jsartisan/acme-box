import gql from 'graphql-tag';

export const GET_ITEMS = parent => gql`
{
  items(parent: "${parent}") {
    id
    name
    isFile
    createdAt
    parent
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
    }
  }
`;

export const ADD_FOLDER = gql`
  mutation addFolder($name: String!, $parent: String!) {
    addFolder(name: $name, parent: $parent) {
      id
      name
      isFile
      parent
      createdAt
    }
  }
`;

export const ADD_FILE = gql`
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
