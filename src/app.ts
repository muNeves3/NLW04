import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import createConnection from './database';
import AppError from './Errors/AppError';
import router from './routes';

createConnection();
const app = express();
app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'Error',
    message: `internal server Error ${err.message}`
  })
}
);

app.get('/', (req, res) => {
  return res.json({"message": "Hello, World - NLW04"});
})

app.post('/', (req, res) => {
  return res.json({"message": "Os dados foram salvos com sucesso"});
})

export default app;
