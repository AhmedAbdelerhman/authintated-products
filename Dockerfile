# Use the official Node.js LTS (Alpine) image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json ./

# Install Node.js dependencies
RUN npm install  

# Copy the rest of the application files to the container
COPY . .
RUN npm install -g webpack-cli


# Build the Nest.js app
RUN npm run build

# Expose the port your Nest.js application is listening on
EXPOSE 8000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]