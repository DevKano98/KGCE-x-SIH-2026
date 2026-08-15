// backend/config/db.js
import pkg from 'pg';
const { Pool } = pkg;
import { env } from './env.js';
export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: { rejectUnauthorized: false }
});