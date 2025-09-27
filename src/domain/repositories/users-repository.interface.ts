import type { User } from '../entities/user.entity.ts';

export interface IUsersRepository {
	create(user: User): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
}
