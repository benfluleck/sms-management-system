
import dotenv from 'dotenv';
import app from './server';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port,
  () => console.log(`Welcome to Datanomics Hotel Application, listening on ${port}`)
);
