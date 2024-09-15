import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';

// Define the Country model extending Sequelize's Model class
class Country extends Model {
    // Define the attributes of the model
    public id!: number;                // Country ID (autoIncrement, primaryKey)
    public name!: string;              // Country name
    public readonly createdAt!: Date;  // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;  // Timestamp of last update (automatically managed)
}

// Initialize the Country model with its attributes and configurations
Country.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,  // Data type for ID (unsigned integer)
        autoIncrement: true,              // Auto-incrementing attribute
        primaryKey: true,                 // Primary key of the table
    },
    name: {
        type: new DataTypes.STRING(128),  // Data type for name (string up to 128 characters)
        allowNull: false,                // Name cannot be null
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'countries',  // Name of the table in the database
    modelName: 'Country',    // Model name
});

export default Country;