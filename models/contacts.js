const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { contactsSchemaMongoose } = require("../schemas/contacts-schemas");
const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", contactsSchemaMongoose);

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  // const data = await fs.readFile(contactsPath);
  const result = await Contact.find();
  return result;
};

const getContactById = async (id) => {
  // const allContacts = await listContacts();
  // const result = allContacts.find((contact) => contact.id === contactId);

  const result = await Contact.findOne({ _id: id });
  // console.log(result);
  return result || null;
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  // const allContacts = await listContacts();
  // const newContact = {
  //   id: nanoid(),
  //   name,
  //   email,
  //   phone,
  //   favorite,
  // };
  // allContacts.push(newContact);
  // await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
  });
  return newContact;
};

const updateContact = async (id, body) => {
  // const allContacts = await listContacts();
  // const index = allContacts.findIndex((contact) => contact.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // allContacts[index] = { id, ...body };
  // await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  // return allContacts[index];

  const result = await Contact.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  return result;
};

const removeContact = async (id) => {
  // const allContacts = await listContacts();
  // const index = allContacts.findIndex((contact) => contact.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // const [result] = allContacts.splice(index, 1);
  // await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  // return result;

  const result = await Contact.findOneAndDelete({ _id: contactId });
  return result;
};

const updateStatusContact = async (id, body) => {
  // const allContacts = await listContacts();
  // const index = allContacts.findIndex((contact) => contact.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // const { name, email, phone } = allContacts[index];
  // allContacts[index] = { id, name, email, phone, ...body };
  // await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  // return allContacts[index];
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
