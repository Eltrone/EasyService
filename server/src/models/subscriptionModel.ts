import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import User from './userModel';  // Adjust the import path according to your project structure

// Define the Subscription model extending Sequelize's Model class
class Subscription extends Model {
    // Define the attributes of the model
    public id!: number;                  // Subscription ID (autoIncrement, primaryKey)
    public user_id!: number;             // Foreign key referencing User's ID
    public start!: Date;                 // Start date of the subscription
    public end!: Date;                   // End date of the subscription
    public readonly createdAt!: Date;   // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;   // Timestamp of last update (automatically managed)
}

// Initialize the Subscription model with its attributes and configurations
Subscription.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for ID (unsigned integer)
        autoIncrement: true,                // Auto-incrementing attribute
        primaryKey: true,                   // Primary key of the table
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for user_id (unsigned integer)
        allowNull: false,                   // User ID cannot be null
    },
    start: {
        type: DataTypes.DATE,               // Data type for start (date)
        allowNull: false,                   // Start date cannot be null
    },
    end: {
        type: DataTypes.DATE,               // Data type for end (date)
        allowNull: false,                   // End date cannot be null
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'Subscriptions',  // Name of the table in the database
    modelName: 'Subscription',   // Model name
    timestamps: true,       // This will add createdAt and updatedAt fields
});

// Set up association with User
Subscription.belongsTo(User, { foreignKey: 'user_id' });

// Override the default toJSON method if needed
Subscription.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

export default Subscription;