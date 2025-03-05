import { AppError } from "../shared/app-error.class";

/**
 * Represents a user with authentication credentials and metadata
 */
export type User = {
	id: number;
	email: string;
	password: string; // Store hash, not plaintext password
	created_at: Date;
	updated_at: Date;
};

/**
 * Default empty user object
 */
export const NULL_USER: User = {
	id: 0,
	email: "",
	password: "",
	created_at: new Date(),
	updated_at: new Date(),
};

/**
 * Validates a user entity
 * @param user - The user to validate
 * @throws AppError if the user is invalid
 */
export const validateUser = (user: Partial<User>): void => {
	// Email validation with regex for basic format checking
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!user.email) {
		throw new AppError("Email is required", "LOGIC");
	}

	if (user.email && !emailRegex.test(user.email)) {
		throw new AppError("Invalid email format", "LOGIC");
	}

	// For password_hash, we only check if it exists when provided
	// The actual password validation should happen before hashing
	if (user.password !== undefined && user.password.length === 0) {
		throw new AppError("Password hash cannot be empty", "LOGIC");
	}
};
