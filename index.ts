import express from 'express';

const app = express();
const PORT = 3232;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server online at port: ${PORT}`);
});
