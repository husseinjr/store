import express, { Application, Request, Response, urlencoded } from 'express';
import { rateLimit } from 'express-rate-limit';
import errorHandeling from './middleware/error.middleware';
import config from './middleware/config';
import dbConnection from './Database/connection';

const port = config.port || 3000;
// create instance from the server
const app: Application = express();

// middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // time
    limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  }),
);

// set view engine to ejs
app.set('view engine', 'ejs');

// database connection ->
dbConnection
  .sync({ force: true })
  .then(() => {
    console.log('syncornization done..');
  })
  .catch((err) => {
    console.log('error in synchorization : ', err);
  });

// routing home
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World, This is Home Page',
  });
});

// for testing end point throw new error
app.get('/error', (req: Request, res: Response) => {
  // throw new Error("Error from this endpoint '/error'");
  res.json({
    message: 'we will not reach hear',
  });
});

// handel errors
app.use(errorHandeling);
// Global error handeling rediricting for 404 page
app.use((_req: Request, res: Response) => {
  res.status(404).render('404', {
    errorMessage: 'The page you are looking for does not exist.',
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

export default app;
