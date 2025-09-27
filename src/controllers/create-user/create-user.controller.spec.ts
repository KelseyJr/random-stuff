import { server } from '../../app.ts';
import { databaseClient } from '../../database/client.ts';
import { users } from '../../database/schema.ts';

describe('CreateUserController', () => {
	beforeEach(async () => {
		await server.ready();
		await databaseClient.delete(users);
	});

	it('should be able to create a new user', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/users',
			payload: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
		});

		expect(response.statusCode).toBe(201);
		expect(response.json()).toEqual({
			id: expect.any(Number),
			name: 'John Doe',
			email: 'john.doe@example.com',
		});
	});

	it('should not be able to create a new user with an email that already exists', async () => {
		const user = {
			name: 'John Doe',
			email: 'john.doe@example.com',
		};

		await databaseClient.insert(users).values(user);
		const response = await server.inject({
			method: 'POST',
			url: '/users',
			payload: {
				name: 'John Doe',
				email: 'john.doe@example.com',
			},
		});

		expect(response.statusCode).toBe(400);
		expect(response.json()).toEqual({
			message: 'User already exists',
		});
	});
});
