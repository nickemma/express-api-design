import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

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
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
