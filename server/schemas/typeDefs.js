const typeDefs = `

type Blog {
  _id: ID!
  blogTitle: String!
  blogText: String!
  blogAuthor: String!
  createdAt: String!
  image: String
  comments: [Comment]
}

type Comment {
  _id: ID!
  commentText: String!
  createdAt: String!
}

type Plant {
  _id: ID!
  plantName: String!
  description: String
  image: String
  careLevel: String
  waterLevel: String
  lightLevel: String
  size: String
  trait: String
}

type Product {
  _id: ID
  name: String
  description: String
  image: String
  quantity: Int
  price: Float
}

type Order {
  _id: ID
  purchaseDate: String
  products: [Product]
}

type User {
  _id: ID
  username: String
  email: String
  password: String
  orders: [Order]
  plants: [Plant]
}

type Checkout {
  session: ID
}

type Auth {
  token: ID
  user: User
}

type Query {
  blogs: [Blog]
  blog(_id: ID!): Blog
  plants: [Plant]
  plant(plantName: String): Plant
  products(category: ID, name: String): [Product]
  product(_id: ID!): Product
  me: User
  user(email: String!): User
  users: [User]
  order(_id: ID!): Order
  checkout(products: [ID]!): Checkout
}

type Mutation {
  createBlog(blogTitle: String!, blogText: String!, blogAuthor: String!, image: String): Blog
  deleteBlog(_id: ID!): Blog
  addComment(blogId: ID!, commentText: String!): Comment
  deleteComment(blogId: ID!, commentId: ID!): Comment
  addUser(username: String!, email: String!, password: String!): Auth
  updateUser(username: String, email: String, password: String): User  
  addOrder(products: [ID]!): Order
  addPlant(plantId: ID!): User
  removePlant(plantId: ID!): User
  updateProduct(_id: ID!, quantity: Int!): Product
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;

// updateBlog(_id: ID!, blogTitle: String, blogText: String, image: String): Blog


// input PlantInput {
//   _id: ID!
//   plantName: String!
//   description: String
//   image: String
//   careLevel: String!
//   waterLevel: String!
//   lightLevel: String!
//   size: String!
//   trait: String!
// }