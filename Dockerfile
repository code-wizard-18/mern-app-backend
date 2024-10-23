# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000 for the app
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
