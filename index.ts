import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes/router';
import { createNewUser, forgotPassword, resetPassword, signin, updatePassword } from './handler/user_handler';
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
app.use('/api', protect, router);

app.post('/users/register', createNewUser);
app.post('/users/signin', signin);
app.post('/users/validate-otp', signin);
app.post('/users/update-password', protect, updatePassword);
app.post('/users/forgot-password', forgotPassword);
app.post('/users/reset-password', resetPassword);

//============= Server
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
