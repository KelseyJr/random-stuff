import { drizzle } from 'drizzle-orm/node-postgres';
import { envSchema } from '../core/env/index.ts';

export const databaseClient = drizzle(envSchema.DATABASE_URL);
