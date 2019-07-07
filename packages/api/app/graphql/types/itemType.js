module.exports = `
  type Query {
    items(parent: String!): [Item]
  }

  type Item {
    id: String
    name: String
    isFile: Boolean
    parent: String
    createdAt: String
  }

  type Mutation {
    addFolder(name: String!, parent: String!): Item
    addFile(name: String!, parent: String!): Item
    deleteItem(id: String!): Boolean
    editItem(id: String!, name: String!): Item
  }
`;
