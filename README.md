# semester-project-automated-resume-builder
# Configuration Instructions

This document describes the steps required to configure and run the project. Please follow the instructions carefully.

## Pre requirements

1. **Download Node.js**: Essential to be able to execute `npm` commands. Download it from [Node.js official website](https://nodejs.org/). At the end, it will ask you something about whether you want to install additional tools necessary to run node.js or something like that if I remember correctly. Be sure to checkmark that option to ensure you avoid problems.

2. **Download PostgreSQL**: You will need PostgreSQL for the database. During installation, it will ask you to create a password. Don't forget it. Download from [PostgreSQL Official Website](https://www.postgresql.org/download/).

## Setting

### Configure the Backend

1. Move to the `api` folder:
    ```
    cd api
    ```
2. Install the necessary dependencies (`express`, `morgan`, `cors`):
    ```
    npm i express morgan cors
    ```
5. Go to the `.env` file in the api and change the `DB_PASSWORD` attribute to the password that you just created by downloading postgresql.
   
6. In the .gitignore folder of the api, uncomment the .env line. This is so that you do not upload your own credentials or other information that may arise in the future.

### Configure the Frontend

1. Move to the `ui/client` folder:
    ```
    cd ui/client
    ```
2. Install the project dependencies:
    ```
    npm install
    ```

### Configure PostgreSQL

1. Open **Windows cmd** and access PostgreSQL with the following command:
    ```
    psql -U postgres
    ```
2. It will ask you for the password that you created during the PostgreSQL installation.

3. To create the `tasksdb` database, run:
    ```
    CREATE DATABASE tasksdb;
    ```
    You can verify that it was created with `\l`.

4. Connect to your new database with:
    ```
    \c tasksdb
    ```

5. To create the `task` table, use:
    ```
    CREATE TABLE task(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE,
        description VARCHAR(255)
    );
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

3. After running both servers you should be able to create tasks and be able to see them like this:

### Creating a task
![image](https://github.com/uprm-inso4115-2023-2024-s2/semester-project-automated-resume-builder/assets/95184925/40a5ebc3-fb0c-4820-a913-3182300a99d4)

### Viewing the task
![image](https://github.com/uprm-inso4115-2023-2024-s2/semester-project-automated-resume-builder/assets/95184925/1e778cf2-e657-4dd8-8091-9ee25d394c72)


## Questions that may arise

### Will it be possible to change the name of the database?
Yes, this entire project is just an example to be able to have a code base that already has the database, back and front end connected. Keep in mind that changing the name of the database also involves changing its name in the .env file and most likely in one or another line of code that uses the name to access it.

### What if I am using Mac OS?
I didn't do the setup on Mac OS but I'm almost sure it wouldn't make much difference, in fact almost none. I imagine that there would be no problems because Node.js and Postgresql are external to the operating system and I understand that both are on Mac OS. If you need help doing anything on Mac, don't hesitate to contact me.

### These instructions did not help me, what do I do?
I made these instructions based on what I had to do to run it on my personal laptop. After finishing the envirment on my PC, what I did was upload it to a separate repo, pull it from my personal laptop and follow the instructions in this README file and it worked. If I skip or forget any step and you understand that these instructions were not useful to you, write to me so I can add it to this set of instructions.

