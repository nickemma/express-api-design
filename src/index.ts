import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import protect from './middleware/protect';

const app = express();

//============= Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

//============= test Route for server
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Api design'});
});

//============= Routes
app.use('/users', userRoute);
app.use('/api', protect, productRoute);

//============= Server

app.listen(config.port, () => {
  console.log(`API Design On Port http://localhost:${config.port}`);
});

