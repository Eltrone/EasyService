import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import Subscription from '../models/subscriptionModel';
import { addMonths, isAfter } from 'date-fns';

const JWT_SECRET = "your_jwt_secret" as any;  // Define JWT secret (ideally, store securely)

class AuthController {

	// Handle user login
	public static login = async (req: Request, res: Response): Promise<void> => {
		const { email, password } = req.body;  // Extract email and password from request body

		try {
			const user: any = await User.findOne({ where: { email } });  // Find user by email

			if (!user) {
				res.status(401).json({ message: 'Invalid email' });  // User not found, respond with error
				return;
			}

			if (!user.validPassword(password)) {
				res.status(401).json({ message: 'Invalid password' });  // Password doesn't match, respond with error
				return;
			}

			// Check if the user is not an admin
			if (user.type !== "admin") {
				// Find subscription details for the user
				const subscription = await Subscription.findOne({ where: { user_id: user.id } });

				if (!subscription) {
					res.status(401).json({ message: 'Subscription expired' });  // No subscription found, respond with error
					return;
				}

				// Check if subscription has expired
				if (isAfter(new Date(), subscription.end)) {
					res.status(401).json({ message: 'Subscription expired' });  // Subscription expired, respond with error
					return;
				}

				// Generate JWT token with user ID
				const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
				res.json({ message: 'User signin successfully', token, user: { ...user.toJSON(), expiredAt: subscription.end } });  // Respond with success and token
				return;
			}

			// Admin user, generate JWT token
			const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
			res.json({ message: 'User signin successfully', token, user });  // Respond with success and token
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });  // Server error handling
		}
	};

	// Handle user registration
	public static register = async (req: Request, res: Response): Promise<void> => {
		const { name, email, password } = req.body;  // Extract name, email, and password from request body

		try {
			// Check if the email is already registered
			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				res.status(400).json({ message: 'Email already registered' });  // Email already exists, respond with error
				return;
			}

			// Create a new user
			const newUser: any = await User.create({
				name,
				email,
				password,
			});

			// Create a subscription for the new user
			const startDate = new Date();
			const endDate = addMonths(startDate, 1);
			const subscription = await Subscription.create({
				user_id: newUser.id,
				start: startDate,
				end: endDate,
			});

			// Check if the user is not an admin
			if (newUser.type !== "admin") {
				// Handle subscription validity
				if (!subscription) {
					res.status(401).json({ message: 'Subscription expired' });  // Subscription creation failed, respond with error
					return;
				}

				// Check if subscription has expired
				if (isAfter(new Date(), subscription.end)) {
					res.status(401).json({ message: 'Subscription expired' });  // Subscription expired, respond with error
					return;
				}

				// Generate JWT token with user ID
				const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
				res.json({ message: 'User registered successfully', token, user: { ...newUser.toJSON(), expiredAt: subscription.end } });  // Respond with success and token
				return;
			}

			// Admin user, generate JWT token
			const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
			res.json({ message: 'User registered successfully', token, user: newUser });  // Respond with success and token
			// res.status(201).json({ message: 'User registered successfully', user: newUser });
		} catch (error) {
			// Handle registration errors
			console.error('Error during user registration:', error);
			res.status(500).json({ error: 'Internal Server Error' });  // Server error handling
		}
	};

	// Handle user logout
	public static logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			// Clear session cookie and logout with Passport.js
			res.clearCookie('connect.sid');  // Clear session cookie
			req.logout(function (err) {  // Logout from Passport.js
				res.status(200).send({ message: 'Logout successful' });  // Send logout success response to client
			});
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });  // Server error handling
		}
	};

	// Get authenticated user details
	public static getAuthenticatedUser = async (req: Request, res: Response): Promise<void> => {
		try {
			// Check if req.user is defined (user authenticated)
			if (!req.user) {
				res.status(401).json({ message: 'Unauthorized' });  // Unauthorized access, respond with error
				return;
			}

			// Find user details by ID
			const user: any = await User.findByPk((req.user as any)?.id);
			if (!user) {
				res.status(404).json({ message: 'User not found' });  // User not found, respond with error
				return;
			}

			// Check if the user is not an admin
			if (user.type !== "admin") {
				// Find subscription details for the user
				const subscription = await Subscription.findOne({ where: { user_id: user.id } });

				if (!subscription) {
					res.status(401).json({ message: 'Subscription expired' });  // Subscription not found, respond with error
					return;
				}

				// Check if subscription has expired
				if (isAfter(new Date(), subscription.end)) {
					res.status(401).json({ message: 'Subscription expired' });  // Subscription expired, respond with error
					return;
				}

				res.json({ ...user.toJSON(), expiredAt: subscription.end });  // Respond with user details and subscription end date
				return;
			}

			res.json(user);  // Respond with admin user details
			
		} catch (error) {
			res.status(500).json({ error: 'Internal Server Error' });  // Server error handling
		}
	};
}

export default AuthController;
