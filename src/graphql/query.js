import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query($author: Int!) {
    posts(where: { author: $author }) {
      nodes {
        id
        title
        content
        author {
          node {
            id
            email
            databaseId
          }
        }
      }
    }
  }
`;

export const GET_NOTE = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author {
        node {
          id
          email
          databaseId
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
    }
  }
`;
