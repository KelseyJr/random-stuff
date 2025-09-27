export type UserProps = {
	id?: number;
	name: string;
	email: string;
};

export class User {
	private _id: number | null;
	private _name: string;
	private _email: string;

	private constructor(props: UserProps) {
		this._id = props.id ?? null;
		this._name = props.name;
		this._email = props.email;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get email() {
		return this._email;
	}

	static create(props: UserProps) {
		return new User(props);
	}
}
