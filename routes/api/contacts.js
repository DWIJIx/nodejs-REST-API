const express = require("express");

const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const schemas = require("../../schemas/contacts-schemas");
const { validateBody } = require("../../decorators");

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:id",
  validateBody(schemas.contactUpdateSchema),
  contactsController.updateContact
);

router.delete("/:id", contactsController.removeContact);

router.patch(
  "/:id/favorite",
  validateBody(schemas.UpdateStatusContactSchema),
  contactsController.updateStatusContact
);

module.exports = router;
