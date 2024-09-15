import { Router, Request, Response } from 'express';
import { Provider } from '../models/provider'; // Assure-toi que ton modèle Sequelize est défini
import { Op } from 'sequelize'; // Sequelize Opérateur pour effectuer des comparaisons

const router = Router();

// Route pour récupérer les fournisseurs avec des filtres
router.get('/providers', async (req: Request, res: Response) => {
    try {
        const { activityDomain, serviceProvided, countryLocation } = req.query;

        // Créer une clause WHERE dynamique
        let whereClause: any = {};

        if (activityDomain) {
            whereClause.activityDomain = { [Op.contains]: [activityDomain] };
        }
        if (serviceProvided) {
            whereClause.serviceProvided = { [Op.contains]: [serviceProvided] };
        }
        if (countryLocation) {
            whereClause.countryLocation = { [Op.contains]: [countryLocation] };
        }

        // Récupérer les fournisseurs qui correspondent aux filtres
        const providers = await Provider.findAll({
            where: whereClause,
        });

        res.status(200).json({ providers });
    } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des fournisseurs' });
    }
});

// Route POST pour ajouter un fournisseur
router.post('/providers', async (req: Request, res: Response) => {
    try {
        const newProvider = await Provider.create(req.body); // Créer un nouveau fournisseur
        res.status(201).json(newProvider); // Répondre avec le nouveau fournisseur
    } catch (error) {
        console.error('Erreur lors de la création du fournisseur :', error);
        res.status(500).json({ error: 'Erreur lors de la création du fournisseur' });
    }
});

export default router;
