import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';
import { CreateUserUseCase } from '../../use-cases/create-user.use-case.ts';

export const createUserController: FastifyPluginAsyncZod = async (server) => {
	server.post(
		'/users',
		{
			schema: {
				tags: ['users'],
				summary: 'Create a new user',
				description: 'Create a new user',
				body: z.object({
					name: z.string(),
					email: z.string(),
				}),
				response: {
					201: z.object({
						id: z.number(),
						name: z.string(),
						email: z.string(),
					}),
					400: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, email } = request.body;

			const createUserUseCase = new CreateUserUseCase();

			const createdUser = await createUserUseCase.execute(name, email);

			reply.status(201).send({
				id: createdUser.id as number,
				name: createdUser.name,
				email: createdUser.email,
			});
		},
	);
};
