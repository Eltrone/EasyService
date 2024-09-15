import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import bcrypt from 'bcryptjs';

// Define the User model extending Sequelize's Model class
class User extends Model {
    // Define the attributes of the model
    public id!: number;                  // User ID (autoIncrement, primaryKey)
    public name!: string;                // User name
    public email!: string;               // User email
    public password!: string;            // Encrypted password
    public type!: "admin" | "user";      // User type ('admin' or 'user')
    public readonly createdAt!: Date;   // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;   // Timestamp of last update (automatically managed)

    // Method to validate password
    public validPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}

// Initialize the User model with its attributes and configurations
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for ID (unsigned integer)
        autoIncrement: true,                // Auto-incrementing attribute
        primaryKey: true,                   // Primary key of the table
    },
    name: {
        type: new DataTypes.STRING(128),     // Data type for name (string up to 128 characters)
        allowNull: false,                   // Name cannot be null
    },
    email: {
        type: DataTypes.STRING,              // Data type for email (string)
        allowNull: false,                   // Email cannot be null
        unique: true,                       // Email must be unique
    },
    password: {
        type: DataTypes.STRING,              // Data type for password (string)
        allowNull: false,                   // Password cannot be null
    },
    type: {
        type: DataTypes.ENUM('admin', 'user'),  // Data type for type (enum: 'admin' or 'user')
        defaultValue: "user",               // Default value for type is 'user'
        allowNull: false,                   // Type cannot be null
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'users',    // Name of the table in the database
    modelName: 'User',     // Model name
    hooks: {
        // Hook to hash password before creating a new user
        beforeCreate: (user: User) => {
            user.password = bcrypt.hashSync(user.password, 10);
        },
    },
});

// Override the default toJSON method to exclude the password field
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;   // Exclude password field from returned object
    return values;
};

export default User;