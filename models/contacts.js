const mongoose = require("mongoose");
const { contactsSchemaMongoose } = require("../schemas/contacts-schemas");

const Contact = mongoose.model("contact", contactsSchemaMongoose);

const listContacts = async (owner, skip, limit) => {
  const result = await Contact.find({ owner }, "", { skip, limit }).populate(
    "owner",
    "email"
  );
  return result;
};

const getContactById = async (id) => {
  const result = await Contact.findOne({ _id: id });
  return result || null;
};

const addContact = async ({ name, email, phone, favorite = false, owner }) => {
  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner,
  });
  return newContact;
};

const updateContact = async (id, body) => {
  const result = await Contact.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findOneAndDelete({ _id: id });
  return result;
};

const updateStatusContact = async (id, body) => {
  const result = await Contact.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
