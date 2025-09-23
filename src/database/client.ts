import { drizzle } from 'drizzle-orm/node-postgres';
import { envSchema } from '../core/env/index.ts';

const db = drizzle(envSchema.DATABASE_URL);
