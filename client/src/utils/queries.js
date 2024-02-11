import { gql } from '@apollo/client';

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;

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

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

export const QUERY_USER = gql`
  {
    user {
      username
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }`;
  
  export const QUERY_ME = gql`
  {
    user {
      username
      plants {
        _id
        name
        image
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
      blogTitle
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




