import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import User from './userModel';               // Import User model for association
import Service from './serviceModel';         // Import Service model for potential association
import ProviderService from './providerServiceModel'; // Import ProviderService model for association

// Define the Provider model extending Sequelize's Model class
class Provider extends Model {
    // Define the attributes of the model
    public id!: number;                      // Provider ID (autoIncrement, primaryKey)
    public user_id!: number;                 // Foreign key referencing User's ID
    public company_name!: string;            // Name of the company/provider
    public logo!: string | null;             // URL or path to the company logo
    public address!: string;                 // Address of the company
    public phone_number!: string;            // Contact phone number
    public email!: string;                   // Contact email (unique)
    public description!: string | null;      // Description of the company/provider
    public website!: string | null;          // Website URL of the company
    public type_actor!: 'private' | 'public'; // Type of actor ('private' or 'public')
    public readonly createdAt!: Date;       // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;       // Timestamp of last update (automatically managed)
}

// Initialize the Provider model with its attributes and configurations
Provider.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for ID (unsigned integer)
        autoIncrement: true,                // Auto-incrementing attribute
        primaryKey: true,                   // Primary key of the table
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for user_id (unsigned integer)
        allowNull: false,                   // User ID cannot be null
    },
    company_name: {
        type: new DataTypes.STRING(128),     // Data type for company_name (string up to 128 characters)
        allowNull: false,                   // Company name cannot be null
    },
    logo: {
        type: DataTypes.STRING,              // Data type for logo (string, nullable)
        allowNull: true,                     // Logo can be null
    },
    address: {
        type: DataTypes.STRING,              // Data type for address (string)
        allowNull: false,                    // Address cannot be null
    },
    description: {
        type: DataTypes.TEXT,                // Data type for description (text, nullable)
        allowNull: true,                     // Description can be null
    },
    website: {
        type: DataTypes.STRING,              // Data type for website (string, nullable)
        allowNull: true,                     // Website can be null
    },
    phone_number: {
        type: DataTypes.STRING,              // Data type for phone_number (string)
        allowNull: false,                    // Phone number cannot be null
    },
    email: {
        type: DataTypes.STRING,              // Data type for email (string)
        allowNull: false,                    // Email cannot be null
        unique: true,                        // Email must be unique
    },
    type_actor: {
        type: DataTypes.ENUM('private', 'public'),  // Data type for type_actor (enum: 'private' or 'public')
        allowNull: false,                    // Type_actor cannot be null
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'providers',  // Name of the table in the database
    modelName: 'Provider',   // Model name
});

// Set up association with User
Provider.belongsTo(User, { foreignKey: 'user_id' });

// Override the default toJSON method to exclude sensitive fields when serializing to JSON
Provider.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    // Remove sensitive fields from the returned object
    delete values.email;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
};

export default Provider;