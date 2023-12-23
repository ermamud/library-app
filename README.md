# Angular-NestJS Starter Template

This project serves as a starter template for take-home interviews, featuring a frontend built with Angular 16 and a backend built with Nest.js connected to a Mongo database. It's designed to provide a solid foundation for building web applications, with a focus on ease of use and extensibility.

## Project Structure

The project is structured into two main directories:

- `app`: Contains the Nest.js backend application, utilizing Mongoose for MongoDB interactions..
- `ui`: Contains the Angular 16 frontend application.

Additionally, a `docker-compose.yml` file is provided to ease the process of building and running the applications along with a MongoDB instance.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### Building and Running the Applications

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/bstanley78/angular-nestjs-starter.git
   cd angular-nestjs-starter
   ```

2. Install dependencies:
   ```bash
   cd app && yarn install
   cd ui && yarn install
   ```   

3. Build and start the applications using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the applications:
    - Frontend: Open http://localhost:4200 in your web browser.
    - Backend: Send requests to http://localhost:3000.

### Database
A MongoDB instance is included in the `docker-compose.yml` file, and the Nest.js application is configured to interact with MongoDB using Mongoose. The connection URL is configured in the `docker-compose.yml` file, and can be updated to match your preferences.

### Features
- A sample `tasks` resource is provided in the `app` project to demonstrate basic CRUD (Create, Read, Update, Delete) operations using Mongoose with MongoDB.  NOTE: You do not have to follow these patterns, they are simply here to demonstrate the MongoDB connectivity.
- A basic `auth/login` route is provided.  It can be used to generate an auth JWT.
   ```
   Route:   /auth/login
   Method:  POST
   Body: {
            "username": string,
            "password": string
         }
   Notes:  Any username/password combination will return a valid JWT that expires in 10m
   ```
- Hot Reloading: Hot reloading is enabled for both the frontend and backend applications, allowing for real-time updates as you modify the code.

## Contributing
This project is intended to serve as a starting point for take-home interviews, and is not actively maintained. However, feel free to fork this repository and submit pull requests with any enhancements.

## License
This project is licensed under the MIT License - see the [mit-license.org](https://mit-license.org/)  for details.

## Acknowledgments
- [Angular](https://angular.io/)
- [Nest.js](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)