import { server } from './app.ts';
import { envSchema } from './core/env/index.ts';

server.listen({ port: envSchema.PORT, host: '0.0.0.0' }).then(() => {
	console.log('HTTP server running!');
});
