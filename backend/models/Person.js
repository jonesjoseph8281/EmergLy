const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  relationship: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Person', ContactsSchema); // Ensure the model name is consistent
