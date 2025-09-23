import { defineConfig } from 'drizzle-kit';
import { envSchema } from './src/core/env/index.ts';

if (!envSchema.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

export default defineConfig({
	out: './drizzle',
	schema: './src/database/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: envSchema.DATABASE_URL,
	},
});
