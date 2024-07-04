import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Api design'});
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
