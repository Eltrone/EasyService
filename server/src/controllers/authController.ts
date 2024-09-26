import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import pool from '../db/config';
import RedisClient from '../models/RedisClient';
import { getProvidersById } from '../services';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export default class AuthController {

    public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: req.__("Please provide username, email, and password") });
            return;
        }

        const connection = await pool.getConnection();

        try {

            await connection.beginTransaction();

            const [existingUser] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length) {
                res.status(400).json({ message: req.__('User already exists with this email') });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connection.query<ResultSetHeader>('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, "admin"]);

            // Fetch the newly created user
            const [newUserRows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [result.insertId]);
            const newUser = newUserRows[0];

            await connection.commit();

            const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

            const payload = { ...newUser };
            delete payload.password;

            const providerIds = await RedisClient.getAllConsultedProviderIds(newUser.id);
            const providers = await Promise.all(providerIds.map(id => getProvidersById(id)));

            res.status(201).json({
                message: req.__('User registered successfully'),
                token,
                user: {
                    ...payload,
                    providers
                },
                providers
            });

            res.status(201).json({ message: req.__('User registered successfully') });
        } catch (error) {
            await connection.rollback();
            next(error);
        } finally {
            await connection.end();
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;

        if (!email) {
            res.status(400).json({ message: req.__('Please provide email') });
            return;
        }

        if (!password) {
            res.status(400).json({ message: req.__('Please provide password') });
            return;
        }

        try {
            const [userResult] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
            const user = userResult[0];

            if (!user) {
                res.status(400).json({ message: req.__('Invalid email or password') });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ message: req.__('Invalid email or password') });
                return;
            }

            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

            const payload = user;
            delete payload.password;

            const providerIds = await RedisClient.getAllConsultedProviderIds((user as any).id);
            const providers = await Promise.all(providerIds.map(id => getProvidersById(id)));

            res.status(200).json({
                message: req.__('Login successful'), token, user: {
                    ...payload,
                    providers
                }, providers
            });
        } catch (error) {
            next(error);
        }
    }

    public static async protectedRoute(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: req.__('You have accessed a protected route!'), user: req.user });
    }

    public static logout(req: Request, res: Response): void {
        res.status(200).json({ message: req.__('Logged out successfully') });
    }
}