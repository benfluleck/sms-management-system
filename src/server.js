import express from 'express';

import { indexRouter } from './routes/index';
import setGlobalMiddleware from './middleware';


const app = express();

setGlobalMiddleware(app);

app.use('/api/v1', indexRouter);


app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

export default app;
