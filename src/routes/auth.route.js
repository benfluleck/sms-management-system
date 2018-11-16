import { Router } from 'express';

export const authRouter = Router();

authRouter.route('/signin').get((req, res) => res.status(200).send('I want to sign In')
);
