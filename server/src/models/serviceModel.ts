import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';

// Define the Service model extending Sequelize's Model class
class Service extends Model {
    // Define the attributes of the model
    public id!: number;                  // Service ID (autoIncrement, primaryKey)
    public name!: string;                // Service name
    public readonly createdAt!: Date;   // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;   // Timestamp of last update (automatically managed)
}

// Initialize the Service model with its attributes and configurations
Service.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for ID (unsigned integer)
        autoIncrement: true,                // Auto-incrementing attribute
        primaryKey: true,                   // Primary key of the table
    },
    name: {
        type: new DataTypes.STRING(128),     // Data type for name (string up to 128 characters)
        allowNull: false,                   // Name cannot be null
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'services',  // Name of the table in the database
    modelName: 'Service',   // Model name
});

export default Service;