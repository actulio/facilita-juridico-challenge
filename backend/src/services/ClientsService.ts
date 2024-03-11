import { Client, IClientService } from '../interfaces/IClientService';
import ClientsRepository from '../repositories/ClientsRepository';

export default class ClientsService implements IClientService {
  private repo: ClientsRepository;

  constructor() {
    this.repo = new ClientsRepository();
  }

  async getAllClients(
    page: number,
    limit: number,
    searchString?: string
  ): Promise<{ total: number; clients: Client[] }> {
    const total = await this.repo.count(searchString);
    const clients = await this.repo.findAll(limit, (page - 1) * limit, searchString);
    return { total, clients: clients };
  }

  async createClient(client: Omit<Client, 'id'>): Promise<Client> {
    const exists = await this.repo.findByEmail(client.email);
    if (exists) throw new Error('Client already exists');

    return await this.repo.save(client);
  }

  async getClientById(id: string): Promise<Client | null> {
    const found = await this.repo.findById(id);
    if (!found) throw new Error('Client not found');
    return found;
  }

  async updateClient(Client: Client): Promise<Client> {
    const updated = await this.repo.update(Client);
    if (!updated) throw new Error('Client not found');
    return updated;
  }

  async deleteClient(id: string): Promise<boolean> {
    const deleted = await this.repo.remove(id);
    if (!deleted) throw new Error('Client not found');
    return deleted;
  }
}
