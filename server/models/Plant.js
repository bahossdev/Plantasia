const mongoose = require('mongoose');

const { Schema } = mongoose;

const plantSchema = new Schema({
  plantName: {
    type: String,
    // required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  careLevel: {
    type: String,
    // required: true,
  },
  waterLevel: {
    type: String,
    // required: true,
  },
  lightLevel: {
    type: String,
    // required: true,
  },
  size: {
    type: String,
    // required: true,
  },
  trait: {
    type: String,
    // required: true,
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
