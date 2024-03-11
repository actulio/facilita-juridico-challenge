import pgPromise from 'pg-promise';
import { join } from 'node:path';

export const db = pgPromise()(process.env.POSTGRES_URL!);

db.query(new pgPromise.QueryFile(join(__dirname, '../database/CREATE_TABLES.sql')));

export function connectDatabase() {}
