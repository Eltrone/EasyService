import passport from 'passport';
import pool from './db/config';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { RowDataPacket } from 'mysql2/promise';

// JWT strategy options
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Bearer token in the Authorization header
    secretOrKey: process.env.JWT_SECRET || "your_jwt_secret", // Use environment variable or a fallback secret
};

// Define JWT strategy
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            // Query the user based on jwt_payload.id
            const [userResult] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [jwt_payload.id]);
            const user = userResult;
            if (user.length > 0) {
                // If user is found, return the user object
                return done(null, user[0]);
            } else {
                // If no user is found, return false to indicate failure
                return done(null, false);
            }
        } catch (error) {
            // In case of an error, pass it to the done callback
            return done(error, false);
        }
    })
);

export default passport;