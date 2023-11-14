import { gql } from "@apollo/client";

// USER
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
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
`;

// LIST
const GET_LIST = gql`
  query GetList($listId: ID!) {
    list(listId: $listId) {
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

// STORES
const GET_STORES = gql`
  query GetStores {
    stores {
      _id
      name
      url
      image
    }
  }
`;
