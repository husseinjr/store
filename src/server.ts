import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
// create instance from the server
const app: Application = express();

// middlewares
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // time
    limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
  }),
);

// routing
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World, This is Home Page',
  });
});

// start the server
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

export default app;
