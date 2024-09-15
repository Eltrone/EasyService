import passport from 'passport';
import { Router } from 'express';
import UserController from '../controllers/userController';
import AuthController from '../controllers/authController';
import ProviderController from '../controllers/providerController';
import '../passport'; // Import Passport configuration

const router = Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: JWT_TOKEN_HERE
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a paginated list of users
 *     description: Retrieve a paginated list of users from the database.
 *     parameters:
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: A paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 itemsPerPage:
 *                   type: integer
 *                   example: 10
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *     security:
 *       - bearerAuth: []
 */
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getUsers);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get authenticated user
 *     description: Retrieve the details of the authenticated user.
 *     responses:
 *       200:
 *         description: Authenticated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *     security:
 *       - bearerAuth: []
 */
router.get('/user', passport.authenticate('jwt', { session: false }), AuthController.getAuthenticatedUser);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout the authenticated user.
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal Server Error
 */
router.post('/logout', passport.authenticate('jwt', { session: false }), AuthController.logout);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     description: Retrieve a single user from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *     security:
 *       - bearerAuth: []
 */
router.get('/users/:id', passport.authenticate('jwt', { session: false }), UserController.getUserById);

export default router;
