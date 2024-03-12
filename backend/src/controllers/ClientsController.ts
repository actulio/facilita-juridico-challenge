import { Request, Response } from 'express';
import ClientsService from '../services/ClientsService';
import { Client } from '../interfaces/IClientService';
import RoutesService from '../services/RoutesService';

const clientsService = new ClientsService();
const routesService = new RoutesService();

export async function getAllClients(req: Request, res: Response) {
  try {
    const query = req.query as { page: string; limit: string; search?: string };
    const pageNumber = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const searchString = query.search;
    const response = await clientsService.getAllClients(
      Math.max(pageNumber, 1),
      limit,
      searchString
    );
    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message || error });
  }
}

export async function getClientById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const client = await clientsService.getClientById(id);
    if (client) return res.status(200).json(client);
    res.status(404).json({ error: 'Client not found' });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || error });
  }
}

export async function createClient(req: Request, res: Response) {
  try {
    const created = await clientsService.createClient(req.body);
    res.status(201).json(created);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || error });
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const updated = await clientsService.updateClient(req.body);
    if (updated) return res.status(200).json(updated);
    res.status(404).json({ error: 'Client not found' });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || error });
  }
}

export async function deleteClient(req: Request, res: Response) {
  try {
    const id: string = req.params.id;
    const deleted = await clientsService.deleteClient(id);
    if (deleted) return res.status(200).json({ deleted: true });
    else res.status(404).send({ error: 'Client not found' });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || error });
  }
}

export async function getBestRoute(_: Request, res: Response) {
  try {
    const clients = await clientsService.getAllWithoutFilters();
    const self: Client = { id: 0, email: '', phone: '', name: '', coord_x: 0, coord_y: 0 };
    clients.unshift(self);
    const response = await routesService.getBestRoute(clients);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || error });
  }
}
