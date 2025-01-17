const express = require("express");

const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const schemas = require("../../schemas/contacts-schemas");
const {
  validateBody,
  isValidId,
  validateBodyForFavorite,
  authenticate,
} = require("../../middlewares");

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactUpdateSchema),
  contactsController.updateContact
);

router.delete("/:id", isValidId, contactsController.removeContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBodyForFavorite(schemas.updateStatusContactSchema),
  contactsController.updateStatusContact
);

module.exports = router;
