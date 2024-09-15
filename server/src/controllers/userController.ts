import { Request, Response } from 'express';
import User from '../models/userModel';

class UserController {
    // Controller method to retrieve paginated list of users
    public static getUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            // Retrieve per_page and page from query parameters, set default values if not provided
            const perPage = parseInt(req.query.per_page as string) || 10;
            const page = parseInt(req.query.page as string) || 1;

            // Calculate the offset for pagination
            const offset = (page - 1) * perPage;

            // Find and count all users with pagination
            const { count, rows } = await User.findAndCountAll({
                limit: perPage,
                offset: offset,
            });

            // Calculate total pages
            const totalPages = Math.ceil(count / perPage);

            // Send response with paginated data
            res.json({
                totalItems: count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: perPage,
                users: rows,
            });
        } catch (error) {
            // Handle server error
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Controller method to retrieve a user by ID
    public static getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                // If user found, send user data
                res.json(user);
            } else {
                // If user not found, return 404 error
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            // Handle server error
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default UserController;