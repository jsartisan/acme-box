module.exports = `
  type Query {
    item(id: String!): Item
    items(parent: String!): [Item]
  }

  type Item {
    id: String
    name: String
    parent: String
    isFile: Boolean
    ancestors: [Item]
    createdAt: String
  }

  type Mutation {
    addItem(name: String!, parent: String!, isFile: Boolean!): Item
    deleteItem(id: String!): Boolean
    editItem(id: String!, name: String!): Item
  }
`;
