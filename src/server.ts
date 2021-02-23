import express from 'express';

import 'reflect-metadata';
import './database';
import router from './routes';

const app = express();
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  return res.json({"message": "Hello, World - NLW04"});
})

app.post('/', (req, res) => {
  return res.json({"message": "Os dados foram salvos com sucesso"});
})

app.listen(3333, () => console.log('🚀 Server started on port 3333!'));

