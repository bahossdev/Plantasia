const {
  Blog,
  Category,
  Order,
  Plant,
  Product,
  User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    //Get all users, a single user, and me
    users: async () => {
      return await User.find()
        .select('-__v -password');
    },
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select('-__v -password')
        .populate('plants');
    },

    //User dashboard
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },

    //Get all products and a single product
    products: async () => {
      return await Product.find()
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id)
      // .populate('category');
    },

    //Get all plants
    plants: async () => {
      return await Plant.find()
    },
    plant: async (parent, { _id }) => {
      return await Plant.findById(_id)
      // .populate('category');
    },

    //Get all blogs and a single blog
    blogs: async () => {
      return await Blog.find();
    },
    blog: async (parent, { _id }) => {
      return await Blog.findById(_id)
    },

    //Get all orders
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        // .populate({
        //   path: 'orders.products',
        //   populate: 'category'
        // });
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
    createBlog: async (parent, { blogText, blogTitle, image }, context) => {
      if (context.user) {
        const blog = await Blog.create({
          blogText,
          blogTitle,
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
          blogAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blogs: blog._id } }
        );

        return blog;
      }
      throw AuthenticationError;
    },

    //Add/remove plant to favourite list
    addPlant: async (parent, args, context) => {
      console.log(args);
      if (context.user) {
        const updatedUser =  User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              plants: { _id: args.plants },
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
    removePlant: async (parent, { plantId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              plants: { _id: plantId },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },

    //Add and delete Comment
    addComment: async (parent, { blogId, commentText }, context) => {
      if (context.user) {
        return Blog.findOneAndUpdate(
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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
