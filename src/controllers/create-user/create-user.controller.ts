import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createUserController: FastifyPluginAsyncZod = async (server) => {
    server.post('/users', {
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
                    id: z.string(),
                    name: z.string(),
                    email: z.string(),
                }),
                400: z.object({
                    message: z.string(),
                }),
            },
        },
    }, async (request, reply) => {
        const { name, email } = request.body;


        reply.status(201).send({
            id: '1',
            name,
            email,
        });
    });
};

