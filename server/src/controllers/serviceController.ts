import { Request, Response } from 'express';
import Service from '../models/serviceModel';

class ServiceController {
    // Create a new service
    public static async create(req: Request, res: Response) {
        try {
            const service = await Service.create(req.body);
            return res.status(201).json(service);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Get all services
    public static async findAll(req: Request, res: Response) {
        try {
            const services = await Service.findAll();
            return res.status(200).json(services);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default ServiceController;