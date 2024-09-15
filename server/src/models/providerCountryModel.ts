import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/database';
import Provider from './providerModel';   // Import Provider model for association
import Country from './countryModel';     // Import Country model for association

// Define the ProviderCountry model extending Sequelize's Model class
class ProviderCountry extends Model {
    // Define the attributes of the model
    public provider_id!: number;          // Foreign key referencing Provider's ID
    public country_id!: number;           // Foreign key referencing Country's ID
    public readonly createdAt!: Date;    // Timestamp of creation (automatically managed)
    public readonly updatedAt!: Date;    // Timestamp of last update (automatically managed)
}

// Initialize the ProviderCountry model with its attributes and configurations
ProviderCountry.init({
    provider_id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for provider_id (unsigned integer)
        references: {
            model: Provider,                 // Reference Provider model
            key: 'id',                       // Referencing Provider's primary key 'id'
        },
        onUpdate: 'CASCADE',                 // Cascade update if Provider ID changes
        onDelete: 'CASCADE',                 // Cascade delete if Provider is deleted
    },
    country_id: {
        type: DataTypes.INTEGER.UNSIGNED,    // Data type for country_id (unsigned integer)
        references: {
            model: Country,                  // Reference Country model
            key: 'id',                       // Referencing Country's primary key 'id'
        },
        onUpdate: 'CASCADE',                 // Cascade update if Country ID changes
        onDelete: 'CASCADE',                 // Cascade delete if Country is deleted
    },
}, {
    sequelize,             // Connection instance (sequelize) to be used
    tableName: 'provider_countries',  // Name of the table in the database
    modelName: 'ProviderCountry',     // Model name
});

// Set up associations between Provider and Country through ProviderCountry
Provider.belongsToMany(Country, { through: ProviderCountry, foreignKey: 'provider_id' });
Country.belongsToMany(Provider, { through: ProviderCountry, foreignKey: 'country_id' });

export default ProviderCountry;