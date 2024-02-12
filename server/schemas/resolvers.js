const {
  Blog,
  Order,
  Plant,
  Product,
  User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require('mongodb');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    //Get all users, a single user, and me
    users: async () => {
      return await User.find()
        .select('-__v -password');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('plants');
    },

    //User profile
    me: async (parent, args, context) => {
      if (context.user) {
        // console.log(context.user)
        const userData = await User.findOne({ _id: context.user._id })
        const plantData = await Plant.find({ _id: { $in: userData.plants } });
        userData.plants = plantData;
        const blogData = await Blog.find({ _id: { $in: userData.blogs } });
        userData.blogs = blogData;
        console.log(userData)
        return userData;
      }
      throw AuthenticationError;
    },

    //Get all products and a single product
    products: async () => {
      return await Product.find()
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id)
    },

    //Get all plants
    plants: async () => {
      return await Plant.find()
    },
    plant: async (parent, { plantName }) => {
      return await Plant.findOne({ plantName })
    },

    //Get all blogs and a single blog
    blogs: async () => {
      return await Blog.find();
    },
    blog: async (parent, { blogId }) => {
      return await Blog.findById(blogId)
    },

    //Get all orders
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        return user.orders.id(_id);
      }
      throw AuthenticationError;
    },

    //Checkout
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'cad',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {
    //Add user (sign-up)
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    //Create and delete Blog
    createBlog: async (parent, { blogText, image }, context) => {
      if (context.user) {
        const blog = await Blog.create({
          blogText,
          image,
          blogAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { blogs: blog._id } }
        );

        return blog;
      }
      throw AuthenticationError;
    },
    deleteBlog: async (parent, { blogId }, context) => {
      if (context.user) {
        const blog = await Blog.findOneAndDelete({
          _id: blogId,
          // blogAuthor: context.user.username,
        });

        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blogs: blog._id } }
        );

        return updateUser;
      }
      throw AuthenticationError;
    },

    //Add/remove plant to favourite list
    addPlant: async (parent, args, context) => {
      console.log(args);
      console.log(context.user)
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              plants: { _id: args.plantId },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(updatedUser);
        return updatedUser;
      }
      throw AuthenticationError;
    },
    removePlant: async (parent, args, context) => {
      if (context.user) {
        console.log(args);
        const plantId = new ObjectId(args.plantId);
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              // plants: { _id: args.plantId },
              plants: plantId,
            },
          },
          { new: true }
        );
        console.log('Removed:', updatedUser);
        return updatedUser;
      }
      throw AuthenticationError;
    },

    //Add and delete Comment
    addComment: async (parent, { blogId, commentText }, context) => {
      if (context.user) {
        const newComment = await Blog.findOneAndUpdate(
          { _id: blogId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log(newComment)
        return newComment.comments;
      }
      throw AuthenticationError;
    },
    deleteComment: async (parent, { blogId, commentId }, context) => {
      if (context.user) {
        return Blog.findOneAndUpdate(
          { _id: blogId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

    //Add Order
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw AuthenticationError;
    },

    //Update User
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw AuthenticationError;
    },

    //Update product
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },

    //Login
    login: async (parent, { email, password }, context) => {

      const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw)
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
