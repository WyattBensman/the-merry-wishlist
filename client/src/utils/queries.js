import { gql } from "@apollo/client";

// USER
export const GET_USER = gql`
  query user($userId: ID!) {
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
export const GET_LIST = gql`
  query list($listId: ID!) {
    list(listId: $listId) {
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
  }
`;

// STORES
export const GET_STORES = gql`
  query stores {
    stores {
      _id
      name
      url
      image
    }
  }
`;
