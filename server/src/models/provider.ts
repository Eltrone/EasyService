import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database'; // Fichier de configuration de la connexion à la BDD

// Définition du modèle Provider
class Provider extends Model {
    public id!: number;
    public name!: string;
    public logo_url!: string;
    public address!: string;
    public email!: string;
    public phone_number!: string;
    public presentation!: string;
    public activityDomain!: string[];   // Tableau de chaînes de caractères
    public serviceProvided!: string[];  // Tableau de chaînes de caractères
    public countryLocation!: string[];
}

Provider.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        logo_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        presentation: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        activityDomain: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Tableau de chaînes
            allowNull: true
        },
        serviceProvided: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Tableau de chaînes
            allowNull: true
        },
        countryLocation: {
            type: DataTypes.ARRAY(DataTypes.STRING), // Tableau de chaînes
            allowNull: true
        }
    },
    {
        sequelize, // Passe la connexion à la base de données ici
        tableName: 'service_providers', // Nom de la table dans PostgreSQL
        timestamps: false // Si tu n'utilises pas createdAt et updatedAt
    }
);

export { Provider };
