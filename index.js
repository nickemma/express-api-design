import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Api Design' });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});