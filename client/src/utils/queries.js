import { gql } from '@apollo/client';

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  {
    products {
      _id
      name
      image
      description
      price
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user (username: $username) {
      username
      blogs {
        _id
        blogText
      }
    }
  }`;
  
  export const QUERY_ME = gql`
  {
    me {
      username
      plants {
        _id
        plantName
        image
      }
      blogs {
        _id
        blogText
      }
    }
  }
`;

// export const QUERY_ME = gql`
// {
//   user {
//     username
//     orders {
//       _id
//       purchaseDate
//       products {
//         _id
//         name
//         description
//         price
//         quantity
//         image
//       }
//     }
//     plants {
//       _id
//       name
//       image
//     }
//   }
// }
// `;

export const QUERY_BLOGS = gql`
  query getBlogs {
    blogs {
      _id
      blogText
      blogAuthor
      image
      createdAt
    }
  }
`;

export const QUERY_PLANTS = gql`
  query getPlants {
    plants {
      _id
      plantName
      description
      image
      careLevel
      waterLevel
      lightLevel
      size
      trait
    }
  }
`;

export const QUERY_SINGLE_PLANT = gql`
  query getSinglePlant ($plantName: String){
    plant (plantName: $plantName){
      _id
      plantName
      description
      image
      careLevel
      waterLevel
      lightLevel
      size
      trait
    }
  }
`;

export const QUERY_SINGLE_BLOG = gql`
  query getSingleBlog($blogId: ID!) {
    blog(blogId: $blogId) {
      _id
      blogText
      blogAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;




