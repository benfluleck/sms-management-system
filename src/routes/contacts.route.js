import { Router } from 'express';
import { addContact, getAllContacts, updateContact, deleteContact } from '../controllers/contacts';
import checkInvalidFields from '../validators/checkInvalidFields';
import checkUndefinedFields from '../validators/checkUndefinedFields';
import { sendMessage, getContactsMessages } from '../controllers/messages';

export const contactsRouter = Router();

contactsRouter.route('/')
  .post(checkInvalidFields, checkUndefinedFields, addContact)
  .get(getAllContacts);

contactsRouter.route('/:contactId')
  .put(checkUndefinedFields, updateContact)
  .delete(deleteContact);

contactsRouter.route('/:contactId/messages')
  .post(checkUndefinedFields, sendMessage)
  .get(getContactsMessages);
