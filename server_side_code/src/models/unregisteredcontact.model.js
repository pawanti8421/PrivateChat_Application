const mongoose = require("mongoose");

const unregisteredContactScehma = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "notified"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "UnregisteredContact",
  unregisteredContactScehma
);
