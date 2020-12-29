import { Express } from 'express';
import loginRoute from '../routes/login';

export default (app: Express) => {
  app.use('/', loginRoute);
}