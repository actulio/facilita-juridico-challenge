import axios from 'axios';

import { VITE_APP_BACKEND_URL } from '../config';
import { IClient } from '../interfaces/IClient';
import { DataOrError, createErrorObject } from '../utils/Error';

export class ClientsService {
  private http;

  constructor() {
    this.http = axios.create({
      baseURL: VITE_APP_BACKEND_URL,
    });
    this.http.interceptors.request.use((req) => {
      req.url = req.url?.replace(/\/$/, '');
      return req;
    });
  }

  //TODO:
  public async getClients(page: number): DataOrError<{ total: number; clients: IClient[] }> {
    try {
      const result = await this.http.get(`clients/?page=${page}`);
      return { data: result.data };
      // return { data: { total: 0, clients: [] } };
    } catch (error) {
      return createErrorObject(error);
    }
  }

  public async createClient(client: Omit<IClient, 'id'>): DataOrError<IClient> {
    try {
      const result = await this.http.post(`clients/`, { ...client });
      return { data: result.data };
    } catch (error) {
      return createErrorObject(error);
    }
  }

  public async getClientById(id: string): DataOrError<IClient> {
    try {
      const result = await this.http.get(`clients/${id}`);
      return { data: result.data };
    } catch (error) {
      return createErrorObject(error);
    }
  }

  public async deleteClient(id: number): DataOrError<{ deleted: boolean }> {
    try {
      const result = await this.http.delete(`clients/${id}`);
      return { data: result.data };
    } catch (error) {
      return createErrorObject(error);
    }
  }

  public async updateClient(update: IClient): DataOrError<IClient> {
    try {
      const result = await this.http.put(`clients/${update.id}`, { ...update });
      return { data: result.data };
    } catch (error) {
      return createErrorObject(error);
    }
  }
}
