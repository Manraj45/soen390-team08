# soen390-team08

## Description

Bike ERP is the ERP system develeped by Badob Inc. The main features of our product are:
- Planning
- Scheduling
- Transport Planning/Shipping
- Vendors
- Etc.

Our product will allow creating, editing and tracking of bike components.

## Team Members
- Samuel Huang 40098855): [huangs08](https://github.com/huangs08)
- Simon Lim (40087893): [nasaku898](https://github.com/nasaku898)
- Bowen Song (40092922): [bowsong](https://github.com/bowsong)
- Judy Mezaber (40102104): [jmezaber](https://github.com/jmezaber)
- David Thai (40097613): [davidthai0387](https://github.com/davidthai0387)
- Lauren Lim (40097885): [Mnx458](https://github.com/Mnx458)
- Manraj Rai (40084677): [Manraj45](https://github.com/Manraj45)
- Émilie Martin (40095423): [emilie-martin](https://github.com/emilie-martin)
- Daniela Venuta (40099441): [daniela-venuta](https://github.com/daniela-venuta)

## Technologies
### Backend
- NodeJS
- Express
### Frontend
- React
- Redux
- Material UI
### Database
- MySQL

## Requirements
- NodeJS (12 or above)
- Typescript
- MySQL

## Running the project

### Docker
To run the project on Docker, make sure to have Docker set up following the [documentation](https://github.com/nasaku898/soen390-team08/wiki/Setting-up-Docker).

1. Make sure that Docker is running.

2. In the file `/bike-erp/backend/src/main/config/config.ts`, make sure that the external database variables are uncommented and that the local database variables are commented.

3. Open a terminal and navigate to the bike-erp directory.

4. Run the following command: `docker-compose up --build` 

5. The project will be available at http://localhost:3000.

### Locally
To run the project locally, make sure to have a MySQL database set up following the [documentation](https://github.com/nasaku898/soen390-team08/wiki/Setting-up-MySql).

1. In the file `/bike-erp/backend/src/main/config/config.ts`, make sure that the local database variables are uncommented and that the external database variables are commented. You have to enter the password (and other information if necessary) of your local mysql database in the config.ts file.

2. Open a terminal and navigate to the bike-erp directory.

3. Run the following install and build scripts: `sh install.sh; sh build.sh`

    | `sh install.sh`                                                                | `sh build.sh`                                                                          |
    |:------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|
    | This script will install all the node modules for the frontend and the backend | This script will start the front end, the backend server and the authentication server |

    Should the scripts not work (e.g. you are running the above in the command prompt), run the following commands:

    i. `npm install`

    ii. `cd backend`

    iii. `npm install`

    iv. Open three new terminals:

    In the first terminal, `cd` into the bike-erp directory and run the following command: 
    `npm start`

    In the second terminal, `cd` into the bike-erp directory and run the following commands: 
    `cd backend`
    `npm run dev`

    In the third terminal, `cd` into the bike-erp directory and run the following commands:
    `cd backend`
    `npm run authStart`

4. The project will be available at http://localhost:3000.