# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Build TypeScript files
RUN npm run build

# Start the app in development mode with nodemon for auto-reload
# You can use "npm start" for production in a different CMD
CMD ["npm", "run", "dev"]