# EasyService

## Project Overview

**EasyService** is a web platform designed to help companies, particularly in industries such as food & beverage, supplements, cosmetics, and medical devices, easily find qualified service providers. The platform bridges the gap between companies in need of specialized services and providers offering expertise in areas like regulation, research & development, sales, and logistics.

## Team Members

- **Amine EL ORCHE** - UI development and backend functionalities
- **Abdelhafid MAHMOUDI** - Database structure, server-side management, and frontend contributions

## Project Idea

The idea for this platform originated from a gap identified while working as a regulatory consultant. The goal is to create a website that consolidates service providers in one place, allowing businesses to quickly find the right expertise for their needs.

## Features

- Search for service providers based on criteria such as domain, services offered, country, etc.
- Service providers can register and complete profiles to enhance visibility.
- Companies can find experts in various fields, including regulatory advice, commercial expansion, and transportation services.

## Technologies Used

### Front-End

- **React**: For creating dynamic user interfaces.
- **TypeScript**: For a more structured codebase.
- **Bootstrap**: To ensure responsive design.
- **Axios**: For making HTTP requests to the server.

### Back-End

- **Express on Node.js**: To handle server requests and integrate APIs.
- **Passport.js**: Middleware for authentication and session management.
- **MySQL**: A robust database system for storing and managing service provider and user data.
- **MySQL2**: MySQL driver for managing database operations.
- **Redis**: Used to cache frequently accessed data, improving performance.

### Hosting & Deployment

- **Docker**: For containerizing the application to ensure consistent development and production environments.
- **VPS on OVH**: Hosting the application on a VPS for flexible scaling and direct server management.

## Architecture

### Front-End

- **public/**: Contains static files like the entry point `index.html`.
- **src/**: Core of the front-end development, including:
  - `pages/`: React components for different pages (Search, Provider, Admin, Contact, etc.).
  - `layouts/`: General layout components like header and footer.
  - `styles/`: CSS stylesheets for managing component and page appearance.
  - `utils/`: Utility functions used across the application.
  - `App.tsx`: Main application file integrating components and routes.
  - **Dockerfile**: Instructions to containerize the front-end using Docker.
  - **tsconfig.json**: TypeScript configuration settings.

### Back-End

- **index.tsx**: The entry point of the backend, responsible for initializing the server and setting configurations.
- **router/**: Defines how the server responds to different API requests.
- **controllers/**: Logic for handling service providers, user authentication, and other operations.
- **models/**: Defines the database schemas (e.g., Provider, User).
- **configs/**: Contains default configuration values and database connection settings.
- **i18n**: Support for multiple languages.
- **Redis**: Integrated for caching frequently accessed data.

## Successes

- Developed a functional platform allowing service providers and companies to register, create accounts, and interact.
- Implemented advanced search and sorting functionalities for finding providers.
- Restricted access to certain features to encourage user sign-ups.

## Challenges

- Integrating multiple authentication options.
- Developing a robust search system.

## Future Improvements

- Enhance frontend styling.
- Integrate external APIs (e.g., Google Maps).
- Add messaging functionality between users.
- Develop a community forum for expert Q&A.
- Consider expanding the platform to include product suppliers.
- Develop a mobile app version.
- Consider subscription-based listings for service providers.

## Lessons Learned

This project enhanced the team's technical and professional skills in full-stack development, project management, and teamwork. The foundation laid here opens possibilities for future expansion and innovation.

## Installation

1. Clone the repository.
2. Install dependencies for both front-end and back-end.

## running
```bash
cd server && npm run build && cd .. && make clean && make down && make build && make up
```

## for push in case of changing something
```bash
git add . && git commit -m "test" && git push
```

## remove containers
```bash
docker rm 73d3e7967fc8 f8b3fe85a126 c6aed5adc9f4 f1ded1f8044a f53624c01c03
```

## access the database mysql
```bash
docker exec -it mysql_db mysql -uuser -puser_password
```

## start docker
```bash
docker start mysql_db
```