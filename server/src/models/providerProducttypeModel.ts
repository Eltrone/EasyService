import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import Provider from './providerModel';          // Import Provider model for association
import Producttype from './producttypeModel';    // Import Producttype model for association

// Define the ProviderProducttype model extending Sequelize's Model class
class ProviderProducttype extends Model {
    // Define the attributes of the model
    public provider_id!: number;                 // Foreign key referencing Provider's ID
    public producttype_id!: number;             // Foreign key referencing Producttype's ID
    public readonly createdAt!: Date;           // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;           // Timestamp of last update (automatically managed)
}

// Initialize the ProviderProducttype model with its attributes and configurations
ProviderProducttype.init({
    provider_id: {
        type: DataTypes.INTEGER.UNSIGNED,        // Data type for provider_id (unsigned integer)
        references: {
            model: Provider,                     // Reference Provider model
            key: 'id',                           // Referencing Provider's primary key 'id'
        },
        onUpdate: 'CASCADE',                     // Cascade update if Provider ID changes
        onDelete: 'CASCADE',                     // Cascade delete if Provider is deleted
    },
    producttype_id: {
        type: DataTypes.INTEGER.UNSIGNED,        // Data type for producttype_id (unsigned integer)
        references: {
            model: Producttype,                  // Reference Producttype model
            key: 'id',                           // Referencing Producttype's primary key 'id'
        },
        onUpdate: 'CASCADE',                     // Cascade update if Producttype ID changes
        onDelete: 'CASCADE',                     // Cascade delete if Producttype is deleted
    },
}, {
    sequelize,               // Connection instance (sequelize) to be used
    tableName: 'provider_producttypes',  // Name of the table in the database
    modelName: 'ProviderProducttype',    // Model name
});

// Set up associations between Provider and Producttype through ProviderProducttype
Provider.belongsToMany(Producttype, { through: ProviderProducttype, foreignKey: 'provider_id' });
Producttype.belongsToMany(Provider, { through: ProviderProducttype, foreignKey: 'producttype_id' });

export default ProviderProducttype;