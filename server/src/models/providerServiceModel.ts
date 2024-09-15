import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import Provider from './providerModel';     // Import Provider model for association
import Service from './serviceModel';       // Import Service model for association

// Define the ProviderService model extending Sequelize's Model class
class ProviderService extends Model {
    // Define the attributes of the model
    public provider_id!: number;            // Foreign key referencing Provider's ID
    public service_id!: number;             // Foreign key referencing Service's ID
    public readonly createdAt!: Date;       // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;       // Timestamp of last update (automatically managed)
}

// Initialize the ProviderService model with its attributes and configurations
ProviderService.init({
    provider_id: {
        type: DataTypes.INTEGER.UNSIGNED,   // Data type for provider_id (unsigned integer)
        references: {
            model: Provider,                // Reference Provider model
            key: 'id',                      // Referencing Provider's primary key 'id'
        },
        onUpdate: 'CASCADE',                // Cascade update if Provider ID changes
        onDelete: 'CASCADE',                // Cascade delete if Provider is deleted
    },
    service_id: {
        type: DataTypes.INTEGER.UNSIGNED,   // Data type for service_id (unsigned integer)
        references: {
            model: Service,                 // Reference Service model
            key: 'id',                      // Referencing Service's primary key 'id'
        },
        onUpdate: 'CASCADE',                // Cascade update if Service ID changes
        onDelete: 'CASCADE',                // Cascade delete if Service is deleted
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'provider_services',  // Name of the table in the database
    modelName: 'ProviderService',    // Model name
});

// Set up associations between Provider and Service through ProviderService
Provider.belongsToMany(Service, { through: ProviderService, foreignKey: 'provider_id' });
Service.belongsToMany(Provider, { through: ProviderService, foreignKey: 'service_id' });

export default ProviderService;