# AIRPORT FUEL MANAGEMENT SERVER

- **MVC** Project Structure
- [Passport](https://www.npmjs.com/package/passport) module to support **Local Authentication** using email and password
- **JWT Token** implementation
- **passport-jwt** strategy for authenticating JWT.
- [Celebrate](https://www.npmjs.com/package/celebrate) to **validate request parameters**
- Log using [Winston](https://www.npmjs.com/package/winston) and [Morgan](https://www.npmjs.com/package/morgan)
- **Swagger documentation** for the APIs.
- [Nodemon](https://www.npmjs.com/package/nodemon) to automatically restart the application when file changes
- **ESLint** for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier** as the code formatter
- Test cases using **Mocha** and **Chai**
- **Coverage report** using [nyc](https://www.npmjs.com/package/nyc)
- **Build** and **lint commit messages** using commitizen and commitlint
- **MongoDB database** integration
- **Git hooks** to check for lint before commit and test cases before a git push

## Project Structure

| location                        | Description                                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| src/                            | Consists of all the implementations                                    |
| src/app.js                      | Express app configurations                                             |
| src/bin/www                     | Network related configurations                                         |
| src/config/constants.js         | Constants variables such as log level, salt rounds for hashing, etc.   |
| src/config/database/js          | Database related configurations                                        |
| src/config/responses.js         | Configurations related to response status code, success messages, etc. |
| src/config/server.js            | Server related configurations                                          |
| src/controllers/users           | Controller for /users route(signup and login)                          |
| src/controllers/products        | Controller related to /products route                                  |
| src/database/index.js           | MongoDB connection implementation                                      |
| src/docs/swagger.json           | JSON file for Swagger                                                  |
| src/libraries/logger/index.js   | Logger library                                                         |
| src/libraries/passport/index.js | Passport strategies implementations                                    |
| src/middleware/error-handler/js | Middleware to handle error generated by Celebrate package              |
| src/models/users.js             | Mongoose schema for users                                              |
| src/models/products.js          | Mongoose schema for products                                           |
| src/routes/users.js             | Route for api /users                                                   |
| src/routes/products.js          | Route for api /products                                                |
| src/services/users.js           | Database interaction for api /users                                    |
| src/services/products.js        | Database integration for api /products                                 |
| src/test/common.js              | Common data used across test files                                     |
| src/test/users.js               | Test cases for api /users                                              |
| src/test/products.js            | Test cases for api /products                                           |
| src/test/utilities/js           | Test cases for utilities functions                                     |
| src/utilties/hash.js            | Methods related to hashing data and comparing hash using bcrypt        |
| src/utilities/jwt.js            | Methods related to generation JWT                                      |
| src/utilities/util.js           | Other re-usable methods                                                |

## Prerequisites

- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js](https://nodejs.org/en/download/)

## Getting Started

- Clone the repository first.

      git clone https://github.com/abinashmallik/airport-fuel-management-server.git

- Change directory
  `cd airport-fuel-management-server`

- Install dependencies
  `npm install`

- Import the collection from airport_be
  `mongorestore -d <database_name> <directory_backup>`

- Next, create a `.env` file in the root directory.
  `nano .env`

- Add the database, JWT and Session configurations.
  `JWT_SECRET=thisisasecret SESSION_SECRET=thisissessionsecret DB_NAME=yourdbname`
  You can also change these configuration in `config/` directory. Checkout `.env.sample` file.

- Run the application in dev mode
  `npm run dev`

## Scripts

- `dev` : Run the application in development mode
- `test`: Run the test cases
- `coverage`: Check the code coverage
- `report`: Generate the code coverage in html format(After running this script, open the file `coverage/index.html` in browser)
- `lint`: lint code
- `lint:fix`: Fix linting issue
- `prettier`: Run prettier code formatter
- `commit`: Create commit message

## Runing with Docker

#### Run in Docker

`docker-compose up`

> use -d flag to run in detached mode

#### Tear down

`docker-compose down`

#### To re-build

`docker-compose build`
