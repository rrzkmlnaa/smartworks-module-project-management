# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of your application code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 3001

# Define the command to start your application
CMD ["npm", "start"]
