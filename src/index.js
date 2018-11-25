
import dotenv from 'dotenv';
import app from './server';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3000;


app.listen(port,
  () => console.log(`Welcome to Datanomics Hotel Application, listening on ${port}`)
)
  .on('error', (err) => {
    if (err.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });


export default (app);
