const dotenv = require('dotenv');
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import setupSwagger from '../swagger';
import appProvider from './providers/sequelizedb';
import providerRoutes from './routes/providerRoutes';
import serviceRoutes from './routes/serviceRoutes';
import configRoutes from './routes/configRoutes';

const cors = require("cors");

// const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware to set Content-Type header to application/json for all responses
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Disabling CORS for all origins (not recommended for production)
app.use(cors({ origin: '*' }));

// Initialize Swagger
setupSwagger(app);

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', providerRoutes);
app.use('/api', serviceRoutes);
app.use('/api', configRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/api', providerRoutes);

appProvider(app, PORT);
