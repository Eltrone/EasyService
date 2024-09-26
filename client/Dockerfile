# Stage 1: Build the React app
FROM node:18 AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port that Nginx will use
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]