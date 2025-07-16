const unregisteredContactSchema = require("../models/unregisteredcontact.model.js");
const contactSchema = require("../models/contact.model.js");
const { sendContactJoinMail } = require("./emailMessageSender.js");
const ApiError = require("../utils/ApiError");

// Save unregistered contact (when someone tries to message an unregistered user)
const handlerUnregisteredContact = async (
  userId,
  contactPhoneNumber,
  contactName
) => {
  try {
    const existingContact = await unregisteredContactSchema.findOne({
      requestedBy: userId,
      phoneNumber: contactPhoneNumber,
    });

    if (existingContact) return;

    const savedContact = await unregisteredContactSchema.create({
      requestedBy: userId,
      phoneNumber: contactPhoneNumber,
      contactName,
    });

    if (!savedContact) {
      throw new ApiError(500, "Failed to save unregistered contact.");
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while saving contact.");
  }
};

// Check if a newly registered user was previously an unregistered contact
const checkUserInUnregisteredContact = async (phoneNumber, currentUserId) => {
  try {
    const pendingContacts = await unregisteredContactSchema
      .find({ phoneNumber })
      .populate("requestedBy", "_id name email");

    if (pendingContacts.length === 0) return;

    for (const entry of pendingContacts) {
      const isAlreadyContact = await contactSchema.findOne({
        $or: [
          {
            "userOne.id": currentUserId,
            "userTwo.id": entry.requestedBy._id,
          },
          {
            "userOne.id": entry.requestedBy._id,
            "userTwo.id": currentUserId,
          },
        ],
      });

      if (isAlreadyContact) continue;

      // Send email notification
      await sendContactJoinMail(
        entry.requestedBy.name,
        entry.requestedBy.email,
        entry.contactName,
        phoneNumber
      );

      // Create contact
      await contactSchema.create({
        userOne: { id: entry.requestedBy._id, name: entry.requestedBy.name },
        userTwo: { id: currentUserId, name: entry.contactName },
      });
    }

    // Clean up
    await unregisteredContactSchema.deleteMany({ phoneNumber });
  } catch (error) {
    console.error("checkUserInUnregisteredContact error:", error);
    throw new ApiError(
      500,
      "User registered successfully, but post-registration processing failed."
    );
  }
};

module.exports = {
  handlerUnregisteredContact,
  checkUserInUnregisteredContact,
};
