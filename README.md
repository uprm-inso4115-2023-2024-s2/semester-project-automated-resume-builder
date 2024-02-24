# Deployment of the website. [Visit the page here!!!](https://resume-builder-zr2g.onrender.com/)🎉
# Configuration Instructions

This document describes the steps required to configure and run the project. Please follow the instructions carefully.

## Pre requirements

1. **Download Node.js**: Essential to be able to execute `npm` commands. Download it from [Node.js official website](https://nodejs.org/).

## Local PostgreSQL database
The code will no longer work with the local Postgres database so there is no need to download it.


## Commands to install dependencies in the API folder
```
npm install nodemon --save-dev
```
```
npm i express morgan cors
```
```
npm install bcrypt
```
```
npm install jsonwebtoken
```

## Commands to install dependencies in the ui/client folder
```
npm install
```

## Inside the API folder you are going to create a file called .env with the variables shown below. Please note that no value is shown since these are the credentials to access the database so they are confidential. To find out what your values are, contact Janiel Núñez.
```.env
DB_USER=something
DB_PASSWORD=something
DB_HOST=something
DB_PORT=something
DB_NAME=something
```

## Inside the ui/client folder you will create a file called .env.local with the following content:
```.env
REACT_APP_BACKEND_URL=http://localhost:4000
```


## Run the servers

1. To run the backend, open a terminal, navigate to the `api` folder and run:
    ```
    npm run dev
    ```
    This will start the backend server.

2. To start the frontend, open a new terminal, navigate to `ui/client` and run:
    ```
    npm start
    ```
    This will start the frontend development server.
