import { gql } from "@apollo/client";

// LOGIN
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        fName
        lName
        email
        lists {
          _id
          title
          listItems {
            _id
            itemName
            itemPrice
            itemSize
            itemUrl
          }
        }
        savedStores {
          _id
          name
          url
          image
        }
      }
    }
  }
`;

// CREATE USER
export const CREATE_USER = gql`
  mutation createUser(
    $fName: String!
    $lName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      fName: $fName
      lName: $lName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        fName
        lName
        email
        lists {
          _id
          title
          listItems {
            _id
            itemName
            itemPrice
            itemSize
            itemUrl
          }
        }
        savedStores {
          _id
          name
          url
          image
        }
      }
    }
  }
`;

// CREATE LIST
export const CREATE_LIST = gql`
  mutation createList($userId: ID!, $title: String!) {
    createList(userId: $userId, title: $title) {
      _id
      userId
      title
      listItems {
        _id
        itemName
        itemPrice
        itemSize
        itemUrl
      }
    }
  }
`;

// DELETE LIST
export const DELETE_LIST = gql`
  mutation deleteList($listId: ID!) {
    deleteList(listId: $listId) {
      _id
      userId
      title
      listItems {
        _id
        itemName
        itemPrice
        itemSize
        itemUrl
      }
    }
  }
`;

// CREATE ITEM
export const CREATE_ITEM = gql`
  mutation createItem(
    $listId: ID!
    $itemName: String!
    $itemPrice: String!
    $itemSize: String
    $itemUrl: String!
  ) {
    createItem(
      listId: $listId
      itemName: $itemName
      itemPrice: $itemPrice
      itemSize: $itemSize
      itemUrl: $itemUrl
    ) {
      _id
      itemName
      itemPrice
      itemSize
      itemUrl
    }
  }
`;

// DELETE ITEM
export const DELETE_ITEM = gql`
  mutation deleteItem($listId: ID!, $itemId: ID!) {
    deleteItem(listId: $listId, itemId: $itemId) {
      _id
      itemName
      itemPrice
      itemSize
      itemUrl
    }
  }
`;

// SAVE STORE
export const SAVE_STORE = gql`
  mutation saveStore($userId: ID!, $storeId: ID!) {
    saveStore(userId: $userId, storeId: $storeId) {
      _id
      fName
      lName
      email
      savedStores {
        _id
        name
        url
        image
      }
    }
  }
`;

// UNSAVE STORE
export const UNSAVE_STORE = gql`
  mutation unsaveStore($userId: ID!, $storeId: ID!) {
    unsaveStore(userId: $userId, storeId: $storeId) {
      _id
      fName
      lName
      email
      savedStores {
        _id
        name
        url
        image
      }
    }
  }
`;
