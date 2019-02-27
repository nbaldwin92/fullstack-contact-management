const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContactSchema = new Schema({
  contact: {
    type: String,
    required: true
  },
  addedBy: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Contact = mongoose.model("contacts", ContactSchema);
