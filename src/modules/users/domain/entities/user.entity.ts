export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
}

export interface UserProps {
    id?: string;
    email: string;
    username: string;
    password?: string;
    role?: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User {
    private readonly props: UserProps;

    constructor(props: UserProps) {
        this.props = {
            ...props,
            role: props.role || UserRole.USER,
            createdAt: props.createdAt || new Date(),
            updatedAt: props.updatedAt || new Date(),
        };
    }

    get id() { return this.props.id; }
    get email() { return this.props.email; }
    get username() { return this.props.username; }
    get password() { return this.props.password; }
    get role() { return this.props.role; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }

    public toJSON() {
        return {
            id: this.id,
            email: this.email,
            username: this.username,
            role: this.role,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
