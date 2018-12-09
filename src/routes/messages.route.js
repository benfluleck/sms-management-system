import { Router } from 'express';
import { deleteMessage, getAllMessages } from '../controllers/messages';


export const messageRouter = Router();

messageRouter.get('/', getAllMessages);
messageRouter.delete('/:messageId', deleteMessage);
