import { server } from '../../app';

describe('CreateUserController', () => {
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
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
  });
});