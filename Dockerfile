# Use the official Node.js runtime as the base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies based on NODE_ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies - all for development, only production for production
RUN if [ "$NODE_ENV" = "development" ] ; then npm ci ; else npm ci --only=production ; fi

# Copy the rest of the application code
COPY . .

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# Change ownership of the application directory
RUN chown -R appuser:nodejs /usr/src/app
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]