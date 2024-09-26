import express from 'express';
import router from './router';
import { errorHandler } from './errorHandler';
import cors from 'cors';
import morgan from 'morgan';
import i18n from 'i18n';
import requestIp from 'request-ip';
import geoip from 'geoip-lite';
import passport from './passport';

const app = express();

i18n.configure({
    locales: ['en', 'fr'],
    directory: __dirname + '/locales',
    defaultLocale: 'en',
    autoReload: true,
    updateFiles: false,
});

app.use(requestIp.mw());
app.use(i18n.init);
app.use((req, res, next) => {
    const clientIp = req.clientIp;
    const geo = geoip.lookup(clientIp as any);
    if (geo) {
        const country = geo.country;
        let lang;

        switch (country) {
            case 'FR':
                lang = 'fr';
                break;
            default:
                lang = 'en';
        }

        i18n.setLocale(req, lang);
    } else {
        i18n.setLocale(req, 'en');
    }

    next();
});
app.use(passport.initialize());
app.use(morgan('combined'));

const origins = [
    'http://localhost:3000',
    'http://localhost:7000',
    'http://localhost:3003',
    'http://51.38.177.231:3000',
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;