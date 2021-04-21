"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchComponentsByLocation = exports.insertNewComponent = exports.fetchComponentTypes = exports.fetchAllLocations = exports.fetchComponentLocation = exports.updateComponent = exports.fetchComponent = exports.fetchAllComponents = void 0;
const db_1 = __importDefault(require("../helpers/db"));
const fetchAllComponents = () => {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
      FROM component c , component_location cl
      WHERE c.component_id=cl.component_id`;
        db_1.default.query(query, (err, rows) => {
            if (err)
                return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
exports.fetchAllComponents = fetchAllComponents;
const fetchComponent = (id) => {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
      FROM component c , component_location cl
      WHERE c.component_id = ? and c.component_id = cl.component_id`;
        db_1.default.query(query, [id], (err, rows) => {
            if (err)
                return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
exports.fetchComponent = fetchComponent;
const updateComponent = (id, quantity) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE component SET quantity=? WHERE component_id=?";
        db_1.default.query(query, [quantity, id], (err, rows) => {
            if (err)
                return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
exports.updateComponent = updateComponent;
const fetchComponentLocation = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM component_location WHERE component_id = ?";
        db_1.default.query(query, [id], (err, rows) => {
            if (err)
                return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
exports.fetchComponentLocation = fetchComponentLocation;
const fetchAllLocations = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT DISTINCT location_name FROM component_location";
        db_1.default.query(query, (err, rows) => {
            if (err)
                return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
exports.fetchAllLocations = fetchAllLocations;
const fetchComponentTypes = (location, size) => {
    return new Promise((resolve, reject) => {
        //queries for each type of component
        const queryHandle = `
      SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
      FROM component c, component_location cl
      WHERE c.component_type = "HANDLE"
      AND c.component_id = cl.component_id
      AND cl.location_name = ?
      AND c.size = ?;`;
        const queryWheel = `
      SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
      FROM component c, component_location cl
      WHERE c.component_type = "WHEEL"
      AND c.component_id = cl.component_id
      AND cl.location_name = ?
      AND c.size = ?;`;
        const querySeat = `
      SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
      FROM component c, component_location cl
      WHERE c.component_type = "SEAT"
      AND c.component_id = cl.component_id
      AND cl.location_name = ?
      AND c.size = ?;`;
        const queryDriveTrain = `
      SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
      FROM component c, component_location cl
      WHERE c.component_type = "DRIVE_TRAIN"
      AND c.component_id = cl.component_id
      AND cl.location_name = ?
      AND c.size = ?;`;
        const queryFrame = `
      SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
      FROM component c, component_location cl
      WHERE c.component_type = "FRAME"
      AND c.component_id = cl.component_id
      AND cl.location_name = ?
      AND c.size = ?;`;
        let results = {
            HANDLE: [],
            WHEEL: [],
            SEAT: [],
            DRIVE_TRAIN: [],
            FRAME: [],
        };
        //queries to get all the different components types grouped by location and size
        db_1.default.query(queryHandle, [location, size], (err, rows) => {
            if (err)
                return reject(err);
            let resultsHandle = Object.values(JSON.parse(JSON.stringify(rows)));
            resultsHandle.forEach((element) => results.HANDLE.push(element));
            db_1.default.query(queryWheel, [location, size], (err, rows) => {
                if (err)
                    return reject(err);
                let resultsWheel = Object.values(JSON.parse(JSON.stringify(rows)));
                resultsWheel.forEach((element) => results.WHEEL.push(element));
                db_1.default.query(querySeat, [location, size], (err, rows) => {
                    if (err)
                        return reject(err);
                    let resultsSeat = Object.values(JSON.parse(JSON.stringify(rows)));
                    resultsSeat.forEach((element) => results.SEAT.push(element));
                    db_1.default.query(queryDriveTrain, [location, size], (err, rows) => {
                        if (err)
                            return reject(err);
                        let resultsDriveTrain = Object.values(JSON.parse(JSON.stringify(rows)));
                        resultsDriveTrain.forEach((element) => results.DRIVE_TRAIN.push(element));
                        db_1.default.query(queryFrame, [location, size], (err, rows) => {
                            if (err)
                                return reject(err);
                            let resultsFrame = Object.values(JSON.parse(JSON.stringify(rows)));
                            resultsFrame.forEach((element) => results.FRAME.push(element));
                            resolve(results);
                        });
                    });
                });
            });
        });
    });
};
exports.fetchComponentTypes = fetchComponentTypes;
//insert component
const insertNewComponent = (price, quantity, component_type, component_status, size, specificComponentType, location_name) => {
    return new Promise((resolve, reject) => {
        const queryInsertComponent = "INSERT INTO component(price, quantity, component_type, component_status, size, specificComponentType) VALUES(?, ?, ?, ?, ?, ?);";
        const queryInsertComponentLocation = "INSERT INTO component_location(location_name) VALUES(?);";
        const queryCheckForDuplicate = "SELECT * FROM component c, component_location cl WHERE c.component_type = ? AND c.size = ? AND c.specificComponentType = ? AND cl.location_name = ? AND cl.component_id = c.component_id;";
        const priceAsNum = Number(price);
        const qtyAsNum = Number(quantity);
        //check if all the inputs aren't empty and that it respects the regex
        if (price && quantity && component_type && component_status && size && specificComponentType && location_name && !/^\s/.test(price) && !/^\s/.test(specificComponentType)) {
            if (isNaN(component_type) && isNaN(component_status) && isNaN(size)) {
                db_1.default.query(queryCheckForDuplicate, [component_type, size, specificComponentType, location_name], (err, rows) => {
                    const results = JSON.parse(JSON.stringify(rows));
                    if (err)
                        return reject(err);
                    else if (isNaN(priceAsNum) || isNaN(qtyAsNum) || qtyAsNum < 0 || priceAsNum < 0) {
                        reject({ status: 404, message: "Invalid price or quantity." });
                    }
                    else if (results.length === 0) {
                        db_1.default.query(queryInsertComponent, [price, quantity, component_type, component_status, size, specificComponentType], (err, rows) => {
                            if (err)
                                return reject(err);
                            db_1.default.query(queryInsertComponentLocation, [location_name], (err, rows) => {
                                if (err)
                                    return reject(err);
                                resolve("Component added successfully.");
                            });
                        });
                    }
                    else {
                        reject({ status: 404, message: "Component already exists." });
                    }
                });
            }
            else {
                reject({ status: 404, message: "Component type or status cannot contain numbers." });
            }
            ;
        }
        else {
            reject({ status: 404, message: "Missing / Incorrect inputs." });
        }
    });
};
exports.insertNewComponent = insertNewComponent;
const fetchComponentsByLocation = (location) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT c.component_id, c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.location_name
      FROM component c, component_location cl
      WHERE c.component_id = cl.component_id
      AND cl.location_name = ?;`;
        db_1.default.query(query, [location], (err, rows) => {
            if (err)
                return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
};
exports.fetchComponentsByLocation = fetchComponentsByLocation;
