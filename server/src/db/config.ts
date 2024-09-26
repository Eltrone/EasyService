/**
 * This file sets up the MySQL database connection using a connection pool. 
 * The database credentials (host, user, password, etc.) are loaded from environment variables. 
 * The connection pool allows efficient reuse of connections, with a max limit of 10 connections.
 * Exporting the pool lets other parts of the app interact with the database.
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

export default pool;