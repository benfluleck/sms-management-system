import { Router } from 'express';
import { signup } from '../controllers/auth';
import checkUndefinedFields from '../validators/checkUndefinedFields';
import checkInvalidFields from '../validators/checkInvalidFields';

export const authRouter = Router();

authRouter.route('/signin').get((req, res) => res.status(200).send('I want to sign In')
);

authRouter.post('/signup', checkUndefinedFields, checkInvalidFields, signup);
