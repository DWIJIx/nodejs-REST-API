const express = require("express");

const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.put("/:id", contactsController.updateContact);

router.delete("/:id", contactsController.removeContact);

module.exports = router;
