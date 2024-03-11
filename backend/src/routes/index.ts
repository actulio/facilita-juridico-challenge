import express from 'express';
import * as ClientsController from '../controllers/ClientsController';
import validate from '../middlewares/BodyValidationMiddleware';
import { createClientSchema, updateClientSchema } from './validationSchemas';

const routes = express.Router();

routes.get('/clients/best-route', ClientsController.getBestRoute);
routes.post('/clients', validate(createClientSchema), ClientsController.createClient);
routes.get('/clients', ClientsController.getAllClients);
routes.put('/clients/:id', validate(updateClientSchema), ClientsController.updateClient);
routes.get('/clients/:id', ClientsController.getClientById);
routes.delete('/clients/:id', ClientsController.deleteClient);

export default routes;
