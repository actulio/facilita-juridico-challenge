export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  coord_x: number;
  coord_y: number;
}

export interface IClientService {
  getAllClients(
    pageNumber: number,
    limit: number,
    searchString?: string
  ): Promise<{ total: number; clients: Client[] }>;
  createClient(Client: Omit<Client, 'id'>): Promise<Client>;
  getClientById(ClientId: string): Promise<Client | null>;
  updateClient(Client: Client): Promise<Client | null>;
  deleteClient(ClientId: string): Promise<boolean>;
}
