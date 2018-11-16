// import express from 'express';
import dotenv from 'dotenv';

// import { indexRouter } from './routes/index';
import app from './server';

dotenv.config();
// const app = express();

// app.use('/api/v1', indexRouter);

// app.all('*', (req, res) => {
//     res.status(404).send('Not Found');
// });

app.listen(process.env.PORT,
    () => console.log(`Welcome to Datanomics Hotel Application, listening on ${process.env.PORT}`)
);
