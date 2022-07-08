const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
    immutable: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
