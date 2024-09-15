import { Application } from 'express';
import sequelize from '../config/database'; // Connexion à la BDD
import { Provider } from '../models/provider'; // Assure-toi d'importer ton modèle

const appProvider = (app: Application, port: number) => {
  // Synchronisation avec la base de données
  sequelize.sync().then(() => {
    console.log('Connexion à la base de données réussie.');

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`Serveur à l'écoute sur le port ${port}`);
    });
  }).catch((error) => {
    console.error('Impossible de se connecter à la base de données :', error);
  });
};

export default appProvider;
