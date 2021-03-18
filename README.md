# Bike King

Bike King is an entreprise resource planning (ERP) system whose main goal is to overlook the manufacturing process of bicycles. It acts as a hub for a company to easily manage the manufacturing of its product, as well as its distribution. A registered user will be able to send instructions to the manufacturers to create new bike components or assemble bikes, edit their stock, as well as track components (both components and bike) upon completion of orders.

## Meet the team!

The team working on this project is comprised of the following 9 software engineers:
Name | GitHub handle | Student ID
:---:|:-------------:|:-----------:
Samuel Huang | [huangs08](https://github.com/huangs08) | 40098855
Simon Lim | [nasaku898](https://github.com/nasaku898) | 40087893
Lauren Lim | [Mnx458](https://github.com/Mnx458) | 40097885
Émilie Martin | [emilie-martin](https://github.com/emilie-martin) | 40095423
Judy Mezaber | [jmezaber](https://github.com/jmezaber) | 40102104
Manraj Rai | [Manraj45](https://github.com/Manraj45) | 40084677
Bowen Song | [bowsong](https://github.com/bowsong) | 40092922
David Thai | [davidthai0387](https://github.com/davidthai0387) | 40097613
Daniela Venuta | [daniela-venuta](https://github.com/daniela-venuta) | 40099441

## Technologies

Prerequisites:

- NodeJS (12 or above)
- Typescript
- MySQL

| Backend |  Frontend   | Databse |
| :-----: | :---------: | :-----: |
| NodeJs  |    React    |  MySQL  |
| Express |    Redux    |   ---   |
|   ---   | Material UI |   ---   |

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

3. Run the following:
   - `sh install.sh`: This script will install all the node modules for the frontend and the backend
   - `sh build.sh`: This script will start the frontend, the backend server and the authentication server

Should the scripts not work (e.g. you are running the above in the command prompt), run the following commands in order (left-to-right):

- `npm install`: Installs all frontend dependencies
- `cd backend`: Navigate to the `backend` folder
- `npm install`: Installs all backend dependencies

After, open three new terminals:

- In the first terminal: Navigate to the bike-erp directory and run `npm start`
- In the second terminal: Navigate to the bike-erp directory and run `cd backend` then `npm run dev`
- In the third terminal: Navigate to the bike-erp directory and run `cd backend` and `npm run authStart`

The project should now be available at http://localhost:3000.
