import passport from 'passport';
import User from './models/userModel';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// JWT strategy options
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "your_jwt_secret" as any,
};

// Define JWT strategy
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findByPk(jwt_payload.id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

export default passport;
