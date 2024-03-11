import { db } from '../config/database';
import { Client } from '../interfaces/IClientService';

export default class CLientsRepository {
  private db: typeof db;

  constructor() {
    this.db = db;
  }

  async count(searchString?: string): Promise<[{ count: number }]> {
    if (searchString?.trim()) {
      return this.db.query(
        'SELECT COUNT(*) FROM Clients WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1',
        `%${searchString}%`
      );
    }
    return this.db.query('SELECT COUNT(*) FROM Clients');
  }

  async findAll(limit: number, offset: number, searchString?: string): Promise<Client[]> {
    if (searchString?.trim()) {
      return this.db.manyOrNone(
        'SELECT * FROM Clients WHERE name ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3',
        [`%${searchString}%`, limit, offset]
      );
    }

    return (
      this.db.manyOrNone('SELECT * FROM Clients ORDER BY id DESC LIMIT $1 OFFSET $2', [
        limit,
        offset,
      ]) || []
    );
  }

  async findById(id: string): Promise<Client | null> {
    return await this.db.oneOrNone<Client>('SELECT * FROM Clients WHERE id = $1', id);
  }

  async findByEmail(email: string): Promise<Client | null> {
    return await this.db.oneOrNone<Client>('SELECT * FROM Clients WHERE email = $1', email);
  }

  async save(client: Omit<Client, 'id'>): Promise<Client> {
    const { name, email, phone, coord_x, coord_y } = client;
    return await this.db.one(
      'INSERT INTO clients (name, email, phone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, coord_x, coord_y]
    );
  }

  async remove(id: string): Promise<boolean> {
    const deleted = await this.db.oneOrNone('DELETE FROM Clients WHERE id = $1 RETURNING id', id);
    return deleted ? true : false;
  }

  async update(client: Client): Promise<Client | null> {
    const { id, name, email, phone, coord_x, coord_y } = client;
    return await this.db.oneOrNone<Client>(
      'UPDATE Clients SET name = $1, email = $2, phone = $3, coord_x = $4, coord_y = $5 WHERE id = $6 RETURNING *',
      [name, email, phone, coord_x, coord_y, id]
    );
  }
}
