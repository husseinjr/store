import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
// create instance from the server
const app: Application = express();

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
