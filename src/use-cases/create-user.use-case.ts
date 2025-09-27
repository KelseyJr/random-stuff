import { User } from '../domain/entities/user.entity.ts';
import type { IUsersRepository } from '../domain/repositories/users-repository.interface.ts';
import { UserRepository } from '../repositories/postgres/user-repository.ts';

export class CreateUserUseCase {
	private usersRepository: IUsersRepository;

	constructor() {
		this.usersRepository = new UserRepository();
	}

	async execute(name: string, email: string) {
		const userExists = await this.usersRepository.findByEmail(email);

		if (userExists) {
			throw new Error('User already exists');
		}

		const user = User.create({ name, email });
		const createdUser = await this.usersRepository.create(user);

		return createdUser;
	}
}
