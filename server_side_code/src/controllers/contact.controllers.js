const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const userSchema = require("../models/user.model.js");
const contactSchema = require("../models/contact.model.js");
const {
  handlerUnregisteredContact,
} = require("../utils/handlerUnregisteredContact.js");
const asyncHandler = require("../utils/asyncHandler");

const addContact = asyncHandler(async (req, res) => {
  const { contactName, contactPhoneNumber } = req.body;

  if (contactName === "" || contactPhoneNumber === "") {
    throw new ApiError(400, "All field are required");
  }

  const contactUserExisted = await userSchema.findOne({
    phone: contactPhoneNumber,
  });

  if (!contactUserExisted) {
    handlerUnregisteredContact(req.user._id, contactPhoneNumber, contactName);
    throw new ApiError(400, "User not found");
  }

  const contactAlreadyExisted = await contactSchema.findOne({
    $or: [
      {
        "userOne.id": req.user._id,
        "userTwo.id": contactUserExisted._id,
      },
      {
        "userOne.id": contactUserExisted._id,
        "userTwo.id": req.user._id,
      },
    ],
  });

  if (contactAlreadyExisted) {
    throw new ApiError(400, "Contact already exists");
  }

  const contactAdded = await contactSchema.create({
    userOne: { id: req.user._id, name: req.user.name },
    userTwo: { id: contactUserExisted._id, name: contactName },
  });

  if (!contactAdded) {
    throw new ApiError(500, "Something went wrong. Try after some time");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "User added in your contact list"));
});

const getAllContact = asyncHandler(async (req, res) => {
  const currentUserId = req.user._id;
  const contactList1 = await contactSchema
    .find({
      "userOne.id": currentUserId,
    })
    .populate("userTwo.id", "_id phone");

  const contactList2 = await contactSchema
    .find({
      "userTwo.id": currentUserId,
    })
    .populate("userOne.id", "_id phone");

  let allContactList = [];

  if (contactList1.length > 0) {
    allContactList = contactList1.map((contact) => ({
      chatId: contact._id,
      id: contact.userTwo.id,
      name: contact.userTwo.name,
    }));
  }

  if (contactList2.length > 0) {
    const addMoreContact = contactList2.map((contact) => ({
      chatId: contact._id,
      id: contact.userOne.id,
      name: contact.userOne.name,
    }));
    allContactList = [...allContactList, ...addMoreContact];
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, allContactList, "User contacts fetched successfully")
    );
});

const updateContactDetail = asyncHandler(async (req, res) => {
  const { contactNewName, contactPhone } = req.body;

  if (contactNewName === "") {
    throw new ApiError(400, "Enter new name");
  }

  const contactUserExisted = await userSchema.findOne({
    phone: contactPhone,
  });

  if (!contactUserExisted) {
    throw new ApiError(400, "User not exist");
  }

  const contactExisted = await contactSchema.findOne({
    $or: [
      {
        "userOne.id": req.user._id,
        "userTwo.id": contactUserExisted._id,
      },
      {
        "userOne.id": contactUserExisted._id,
        "userTwo.id": req.user._id,
      },
    ],
  });

  if (!contactExisted) {
    throw new ApiError(400, "Contact not existed");
  }

  if (contactExisted.userOne.id !== req.user._id) {
    contactExisted.userOne.name = contactNewName;
  } else {
    contactExisted.userTwo.name = contactNewName;
  }

  const contactUpdated = await contactExisted.save();

  if (!contactUpdated) {
    throw new ApiError(500, "Somethinr went wrong. Try after some time");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Username updated successfully"));
});

module.exports = { addContact, getAllContact, updateContactDetail };
