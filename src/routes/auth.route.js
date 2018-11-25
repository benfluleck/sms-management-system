import { Router } from 'express';
import { signup, signin } from '../controllers/auth';
import checkUndefinedFields from '../validators/checkUndefinedFields';
import checkInvalidFields from '../validators/checkInvalidFields';

export const authRouter = Router();

authRouter.post('/signin', checkUndefinedFields, signin );

authRouter.post('/signup', checkUndefinedFields, checkInvalidFields, signup);
