const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const blogSchema = new Schema({
  blogTitle: {
    type: String,
    required: 'You need to have a title!',
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  blogText: {
    type: String,
    required: 'You need to leave a blog!',
    minlength: 1,
    maxlength: 400,
    trim: true,
  },
  blogAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  image: {
    type: String,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
