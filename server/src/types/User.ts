export interface User {
    id: number;                // Unique identifier for the user
    username: string;         // Username of the user
    email: string;            // Email address of the user
    password: string;         // Hashed password of the user
    role: 'admin' | 'provider' | 'normal'; // Role of the user
    created_at: Date;         // Timestamp when the user was created
    updated_at: Date;         // Timestamp when the user was last updated
}