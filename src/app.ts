import { fastifySwagger } from '@fastify/swagger';
import scalarAPIReference from '@scalar/fastify-api-reference';
import fastify from 'fastify';
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createUserController } from './controllers/create-user/create-user.controller';

const server = fastify().withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === 'development') {
	server.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Desafio Node.js',
				version: '1.0.0',
			},
		},
		transform: jsonSchemaTransform,
	});

	server.register(scalarAPIReference, {
		routePrefix: '/docs',
	});
}

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createUserController);

export { server };
