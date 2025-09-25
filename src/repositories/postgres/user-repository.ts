import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { databaseClient } from '../../database/client.ts';
import { users } from '../../database/schema.ts';
import { User } from '../../domain/entities/user.entity.ts';
import type { IUsersRepository } from '../../domain/repositories/users-repository.interface.ts';

export class UserRepository implements IUsersRepository {
	private db: NodePgDatabase;

	constructor() {
		this.db = databaseClient;
	}

	async findByEmail(email: string): Promise<User | null> {
		const [user] = await this.db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user) {
			return null;
		}

		return User.create({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	}

	async create(user: User): Promise<User> {
		const [createdUser] = await this.db
			.insert(users)
			.values({
				name: user.name,
				email: user.email,
			})
			.returning();

		return User.create({
			id: createdUser.id,
			name: createdUser.name,
			email: createdUser.email,
		});
	}
}
