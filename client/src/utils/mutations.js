import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BLOG = gql`
  mutation addBlog($blogText: String!, $blogAuthor: String!, $image: String) {
    createBlog( blogText: $blogText, blogAuthor: $blogAuthor, image: $image) {
      _id
      blogText
      blogAuthor
      image
      createdAt
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($blogId: ID!) {
    deleteBlog(blogId: $blogId) {
      _id
    }
  }
`;

export const ADD_PLANT = gql`
  mutation addPlant($plantId: ID!) {
    addPlant(plantId: $plantId){
      username
      plants{
      _id
      }
    }
  }
  `;

export const REMOVE_PLANT = gql`
  mutation removePlant($plantId: ID!) {
    removePlant(plantId: $plantId){
      username
      plants{
      _id
      }
    }
  }
  `;

export const ADD_COMMENT = gql`
  mutation AddComment($blogId: ID!, $commentText: String!) {
    addComment(blogId: $blogId, commentText: $commentText) {
      _id
      commentText
      createdAt
      commentAuthor
    }
  }
  `;

  export const DELETE_COMMENT = gql`
  mutation deleteComment($blogId: ID!, $commentId: ID!) {
    deleteComment(blogId: $blogId, commentId: $commentId) {
      _id
    }
  }
  `;