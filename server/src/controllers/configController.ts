import { Request, Response } from 'express';
import Service from '../models/serviceModel';
import Country from '../models/countryModel';
import Producttype from '../models/producttypeModel';

class ConfigController {
    // Retrieves all services, countries, and product types
    public static async all(req: Request, res: Response) {
        try {
            const services = await Service.findAll();  // Fetch all services
            const countries = await Country.findAll();  // Fetch all countries
            const types = await Producttype.findAll();  // Fetch all product types
            return res.status(200).json({ services, countries, types });  // Respond with fetched data
        } catch (error: any) {
            return res.status(500).json({ error: error.message });  // Handle server error
        }
    }
}

export default ConfigController;