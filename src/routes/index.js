import { Router } from 'express';

import { authRouter } from './auth.route';
import { contactsRouter } from './contacts.route';
import { messageRouter } from './messages.route';
import { checkSession } from '../middleware/checkSession';


export const indexRouter = Router();

indexRouter.route('/')
  .get(
    (req, res) => res.status(200).send({ message: 'Welcome to the SMS Management endpoints' })
  );

indexRouter.use('/auth', authRouter);
indexRouter.use('/contacts', checkSession, contactsRouter);
indexRouter.use('/messages', checkSession, messageRouter);

