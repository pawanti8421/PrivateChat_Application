const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    userOne: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: {
        type: String,
        required: true,
      },
    },
    userTwo: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
