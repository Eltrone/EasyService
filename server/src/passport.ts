import passport from 'passport';
import pool from './db/config';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { RowDataPacket } from 'mysql2/promise';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const [userResult] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [jwt_payload.id]);
            const user = userResult;
            if (user.length > 0) {
                return done(null, user[0]);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;