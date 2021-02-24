import db from '../helpers/db'
import { fillComponentCatalogue, fillLocation } from '../helpers/db_catalog_init'

export const initialize_db = (): void => {
    const createAccountQuery: string = `
    CREATE TABLE IF NOT EXISTS account(
        account_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name TINYTEXT NOT NULL,
        last_name TINYTEXT NOT NULL,
        role ENUM('ADMIN','MANAGER','EMPLOYEE','CUSTOMER') NOT NULL,
        password TINYTEXT NOT NULL,
        email VARCHAR(60) NOT NULL UNIQUE,
        recovery_question1 TINYTEXT NOT NULL,
        recovery_question1_answer TINYTEXT NOT NULL,
        recovery_question2 TINYTEXT NOT NULL,
        recovery_question1_2 TINYTEXT NOT NULL,
        organization TINYTEXT NOT NULL
    );`

    const createComponentQuery: string = `
    CREATE TABLE IF NOT EXISTS component(
        component_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        price float(24) NOT NULL,
        quantity int NOT NULL DEFAULT 0,
        component_type ENUM('FRAME','WHEEL', 'SEAT','DRIVE_TRAIN', 'HANDLE') NOT NULL,
        component_status ENUM('AVAILABLE','UNAVAILABLE','INCOMING') NOT NULL,
        size ENUM('LARGE','MEDIUM','SMALL') NOT NULL,
        specificComponentType TINYTEXT NULL
    );`

    const createComponentLocation: string = `
    CREATE TABLE IF NOT EXISTS component_location(
        component_id int NOT NULL,
        location_name VARCHAR(60) NOT NULL,
        PRIMARY KEY(location_name,component_id)
    );`

    const createBike: string = `
    CREATE TABLE IF NOT EXISTS bike(
        bike_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        price float(24),
        size ENUM('LARGE','MEDIUM','SMALL') NOT NULL,
        color TINYTEXT NOT NULL,
        bike_description MEDIUMTEXT NOT NULL,
        grade TINYTEXT NOT NULL,
        quantity int NOT NULL
    );`

    const createFrame: string = `
    CREATE TABLE IF NOT EXISTS frame(
        frame_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        frame_type ENUM('UTILITY', 'TOURING', 'MOUNTAIN') NOT NULL,
        FOREIGN KEY(frame_id) REFERENCES component(component_id)
    );`

    const createHandle: string = `
    CREATE TABLE IF NOT EXISTS handle(
        handle_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        handle_type ENUM('FLAT', 'BULLHORN','DROP') NOT NULL,
        FOREIGN KEY(handle_id) REFERENCES component(component_id)
    );
    `
    const createWheel: string = `
    CREATE TABLE IF NOT EXISTS wheel(
        wheel_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        wheel_type ENUM('UTILITY', 'TOURING', 'MOUNTAIN') NOT NULL,
        FOREIGN KEY(wheel_id) REFERENCES component(component_id)
    );`

    const createSeat: string = `
    CREATE TABLE IF NOT EXISTS seat(
        seat_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        seat_type ENUM('PERFORMANCE', 'CUSHIONED') NOT NULL,
        FOREIGN KEY(seat_id) REFERENCES component(component_id)
    );`

    const createDriveTrain: string = `
    CREATE TABLE IF NOT EXISTS drive_train(
        drive_train_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        drive_train_type ENUM('NOVICE', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'),
        FOREIGN KEY(drive_train_id) REFERENCES component(component_id)
    );`

    const createComposedOf: string = `
    CREATE TABLE IF NOT EXISTS composed_of(
        bike_id int NOT NULL,
        handle_id int NOT NULL,
        wheel_id int NOT NULL,
        frame_id int NOT NULL,
        seat_id int NOT NULL,
        drive_train_id int NOT NULL,
        PRIMARY KEY(bike_id,handle_id,wheel_id,frame_id,seat_id,drive_train_id),
        FOREIGN KEY(bike_id) REFERENCES bike(bike_id),
        FOREIGN KEY(handle_id) REFERENCES handle(handle_id),
        FOREIGN KEY(wheel_id) REFERENCES wheel(wheel_id),
        FOREIGN KEY(frame_id) REFERENCES frame(frame_id),
        FOREIGN KEY(seat_id) REFERENCES seat(seat_id),
        FOREIGN KEY(drive_train_id) REFERENCES drive_train(drive_train_id)
    );`

    const createAccountPayable: string = `
    CREATE TABLE IF NOT EXISTS account_payable(
        account_payable_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        total float(24) NOT NULL,
        payable_date datetime NOT NULL,
        account_id int NOT NULL,
        FOREIGN KEY(account_id) REFERENCES account(account_id)
    );`

    const createTransactionItem: string = `
    CREATE TABLE IF NOT EXISTS transaction_item(
        transaction_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        cost float(24) NOT NULL,
        component_id int NOT NULL,
        quantity_bought int NOT NULL,
        FOREIGN KEY(component_id) REFERENCES component(component_id)
    );`

    const createConsistOf: string = `
    CREATE TABLE IF NOT EXISTS consist_of(
        account_payable_id int NOT NULL,
        transaction_id int NOT NULL PRIMARY KEY,
        FOREIGN KEY(account_payable_id) REFERENCES account_payable(account_payable_id),
        FOREIGN KEY(transaction_id) REFERENCES transaction_item(transaction_id)
    );`

    const createAccountReceivable: string = `
    CREATE TABLE IF NOT EXISTS account_receivable(
        account_receivable int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        bike_id int NOT NULL,
        FOREIGN KEY(bike_id) REFERENCES bike(bike_id)
    );`

    db.query(createAccountQuery, (err, result) => {
        if (err) throw err;
        console.log("Account Table Created")
    })

    db.query(createComponentQuery, (err, result) => {
        if (err) throw err;
        console.log("Component Table Created")
    })

    db.query(createComponentLocation, (err, result) => {
        if (err) throw err;
        console.log("Component Table Created")
    })

    db.query(createBike, (err, result) => {
        if (err) throw err;
        console.log("Bike Tables Created")
    })

    db.query(createFrame, (err, result) => {
        if (err) throw err;
        console.log("Frame Tables Created")
    })
    db.query(createSeat, (err, result) => {
        if (err) throw err;
        console.log("Seat Tables Created")
    })

    db.query(createWheel, (err, result) => {
        if (err) throw err;
        console.log("Wheel Tables Created")
    })

    db.query(createHandle, (err, result) => {
        if (err) throw err;
        console.log("Handle Tables Created")
    })

    db.query(createDriveTrain, (err, result) => {
        if (err) throw err;
        console.log("Drive_train Tables Created")
    })

    db.query(createComposedOf, (err, result) => {
        if (err) throw err;
        console.log("Composed_of Tables Created")
    })

    db.query(createAccountPayable, (err, result) => {
        if (err) throw err;
        console.log("Account_Payable Tables Created")
    })

    db.query(createTransactionItem, (err, result) => {
        if (err) throw err;
        console.log("Transaction_item Tables Created")
    })

    db.query(createConsistOf, (err, result) => {
        if (err) throw err;
        console.log("Consist_of Tables Created")
    })

    db.query(createAccountReceivable, (err, result) => {
        if (err) throw err;
        console.log("Account_receivable Tables Created")
    })

    db.query(fillComponentCatalogue, (err, result) => {
        if (err) throw err;
        console.log("Filling Component Catalogue")
    })

    db.query(fillLocation, (err, result) => {
        if (err) throw err;
        console.log("Adding Component Catalogue to Location")
    })
}