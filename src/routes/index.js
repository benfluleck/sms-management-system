import { Router } from 'express';

import { authRouter } from './auth.route';

export const indexRouter = Router();

indexRouter.route('/')
  .get(
    (req, res) => res.json(200, 'Welcome to the endpoints')
  );

indexRouter.use('/auth', authRouter);
