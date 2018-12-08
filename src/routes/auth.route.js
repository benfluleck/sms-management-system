import { Router } from 'express';
import { signUp, signIn } from '../controllers/auth';
import checkUndefinedFields from '../validators/checkUndefinedFields';
import checkInvalidFields from '../validators/checkInvalidFields';

export const authRouter = Router();

authRouter.post('/signin', checkUndefinedFields, signIn );

authRouter.post('/signup', checkUndefinedFields, checkInvalidFields, signUp);
