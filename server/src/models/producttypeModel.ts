import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';

// Define the Producttype model extending Sequelize's Model class
class Producttype extends Model {
    // Define the attributes of the model
    public id!: number;                // Producttype ID (autoIncrement, primaryKey)
    public name!: string;              // Producttype name
    public readonly createdAt!: Date;  // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;  // Timestamp of last update (automatically managed)
}

// Initialize the Producttype model with its attributes and configurations
Producttype.init({
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
    tableName: 'producttypes',  // Name of the table in the database
    modelName: 'Producttype',    // Model name
});

export default Producttype;