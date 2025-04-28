import 'reflect-metadata';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import { Routers } from './presentation/routers/Routers';
import { HandleError } from './presentation/middlewares/HandleError';

const app = express();
const port: number = Number(process.env.PORT ?? '3000');
const options: CorsOptions = {
  methods: ['POST'],
  origin: '*',
};

app.use(cors(options));
app.use(express.json());
Routers.toLoading(app);
app.use(HandleError.catch);

app.listen(port, () => {
  console.log(`server online on http:localhost:${port}`);
});
