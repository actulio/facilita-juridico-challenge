import pgPromise from 'pg-promise';
import { join } from 'node:path';

// export const pool = new Pool({
// user: process.env.POSTGRES_USER,
// host: 'localhost',
// database: process.env.POSTGRES_DB,
// password: process.env.POSTGRES_PASSWORD,
// port: 5432,
// });
export const db = pgPromise()(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`
);

db.query(new pgPromise.QueryFile(join(__dirname, '../database/CREATE_TABLES.sql')));

export function connectDatabase() {}
