# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
RUN npm install -g @angular/cli@16

# Expose port 4200 for the Angular CLI server
EXPOSE 4200

# Start the Angular CLI server with hot reloading enabled
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--poll=2000"]
