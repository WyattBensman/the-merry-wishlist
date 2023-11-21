const typeDefs = `
type User {
    _id: ID
    fName: String
    lName: String
    email: String
    password: String
    lists: [List]
    savedStores: [Store]
  }
  
  type List {
    _id: ID
    userId: ID
    title: String
    listItems: [Item]
  }
  
  type Item {
    _id: ID
    itemName: String
    itemPrice: String
    itemSize: String
    itemUrl: String
  }
  
  type Store {
    _id: ID
    name: String
    url: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    list(listId: ID!): List
    stores: [Store]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(fName: String!, lName: String!, email: String!, password: String!): Auth
    createList(userId: ID!, title: String!): List
    deleteList(listId: ID!): List
    createItem(listId: ID!, itemName: String!, itemPrice: String!, itemSize: String, itemUrl: String!): Item
    deleteItem(listId: ID!, itemId: ID!): Item
    saveStore(userId: ID!, storeId: ID!): User
    unsaveStore(storeId: ID!): User
  }
`;

module.exports = typeDefs;
