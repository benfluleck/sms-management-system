import { Router } from 'express';
import { checkSession } from '../middleware/checkSession';
import { addContact } from '../controllers/contacts';
import checkInvalidFields from '../validators/checkInvalidFields';
import checkUndefinedFields from '../validators/checkUndefinedFields';

export const contactsRouter = Router();

contactsRouter.route('/')
  .post(checkInvalidFields, checkUndefinedFields, checkSession, addContact);

