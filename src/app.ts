import express from 'express';

import 'reflect-metadata';
import createConnection from './database';
import router from './routes';

createConnection();
const app = express();
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  return res.json({"message": "Hello, World - NLW04"});
})

app.post('/', (req, res) => {
  return res.json({"message": "Os dados foram salvos com sucesso"});
})

export default app;
