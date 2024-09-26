import { Request, Response, NextFunction } from 'express';
import ContactService, { Contact } from '../models/ContactService';
import pool from '../db/config';

export const creatContact = async (req: Request<Omit<Contact, "id">>, res: Response, next: NextFunction) => {
    try {
        const params = req.body;
        const service = new ContactService(pool);
        const contact = await service.createContact(params);
        res.json(contact);
    } catch (err) {
        next(err);
    }
};