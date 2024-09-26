## push
```bash
git add . && git commit -m "test" && git push
```

## running
```bash
cd server && npm run build && cd .. && make clean && make down && make build && make up
```

## access the database mysql
```bash
docker exec -it mysql_db mysql -uuser -puser_password
```

/project-root
│
├── /src                   # Main source directory
│   ├── /config             # Configuration files (environment, database)
│   │   └── db.ts           # Database connection setup
│   │   └── passport.ts     # Passport strategies setup
│   │   └── environment.ts  # Environment configuration
│   │
│   ├── /controllers        # Controller logic for handling requests
│   │   └── authController.ts
│   │   └── userController.ts
│   │   └── providerController.ts
│   │
│   ├── /middlewares        # Custom middleware (authentication, validation)
│   │   └── authMiddleware.ts
│   │   └── errorMiddleware.ts
│   │
│   ├── /models             # Database models (if using Sequelize, Mongoose, etc.)
│   │   └── User.ts
│   │   └── Provider.ts
│   │
│   ├── /routes             # Routes for different features of the application
│   │   └── authRoutes.ts
│   │   └── userRoutes.ts
│   │   └── providerRoutes.ts
│   │   └── index.ts        # Main file where all routes are centralized
│   │
│   ├── /services           # Business logic, database queries, and third-party service calls
│   │   └── authService.ts
│   │   └── userService.ts
│   │
│   ├── /utils              # Utility functions and helper methods
│   │   └── logger.ts       # Logging utility
│   │   └── emailHelper.ts  # Helper for sending emails
│   │
│   ├── /validators         # Input validation (Joi, express-validator)
│   │   └── authValidator.ts
│   │   └── userValidator.ts
│   │
│   ├── app.ts              # Express app setup
│   ├── server.ts           # HTTP server startup file
│
├── /test                   # Tests directory
│   └── /unit               # Unit tests
│   └── /integration        # Integration tests
│
├── /scripts                # Automation scripts (for deployment, database migrations, etc.)
│
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in Git
├── package.json            # NPM dependencies and scripts
├── tsconfig.json           # TypeScript configuration (if applicable)
└── README.md               # Project documentation