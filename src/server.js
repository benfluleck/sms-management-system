import express from 'express';

import { indexRouter } from './routes/index';
import setGlobalMiddleware from './middleware/global';
import session from 'express-session';
import connectRedis from 'connect-redis';

const isProduction = process.env.NODE_ENV === 'production';
const SESSION_LIFETIME = 60 * 60 * 1000 * 2;
const app = express();

const RedisStore = connectRedis(session);

setGlobalMiddleware(app);

app.use(session({
  store: new RedisStore({

  }),
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: isProduction,
    maxAge: SESSION_LIFETIME,
    sameSite: true,
  }
}));


app.use('/api/v1', indexRouter);


app.use((req, res, next) => {
  const error = new Error('Route Not Found');

  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

export default app;
