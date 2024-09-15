import { Request, Response } from 'express';
import { Provider } from '../models/provider';

// Créer un nouveau fournisseur
export const createProvider = async (req: Request, res: Response) => {
  try {
    const newProvider = await Provider.create({
      ...req.body,
      activityDomain: req.body.activityDomain || [], // Ajouter les nouveaux champs
      serviceProvided: req.body.serviceProvided || [],
      countryLocation: req.body.countryLocation || []
    });
    res.status(201).json(newProvider);
  } catch (error) {
    console.error('Erreur lors de la création du fournisseur :', error);
    res.status(500).json({ error: 'Erreur lors de la création du fournisseur' });
  }
};

// Route pour mettre à jour un fournisseur existant
router.put('/providers/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const provider = await Provider.findByPk(id);

    if (provider) {
      await provider.update(req.body);
      res.status(200).json(provider);
    } else {
      res.status(404).json({ error: 'Fournisseur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du fournisseur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du fournisseur' });
  }
});
