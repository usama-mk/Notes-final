import { gql } from "@apollo/client";

// User mutations

export const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
        username
        email
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      authToken
      user {
        id
        databaseId
        username
        email
        name
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($id: ID!, $displayName: String!) {
    updateUser(input: { id: $id, displayName: $displayName }) {
      user {
        id
        databaseId
        username
        email
        name
      }
    }
  }
`;

// Note mutations

export const CREATE_NOTE = gql`
  mutation($title: String!, $content: String!, $status: PostStatusEnum!) {
    createPost(input: { title: $title, content: $content, status: $status }) {
      post {
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

export const DELETE_NOTE = gql`
  mutation($id: ID!) {
    deletePost(input: { id: $id }) {
      deletedId
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation($id: ID!, $title: String!, $content: String!) {
    updatePost(input: { id: $id, title: $title, content: $content }) {
      post {
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
