import { JsonObjectExpression } from 'typescript';
import db from '../helpers/db';
import {Component, Status} from '../models/Component'

export const fetchAllComponents = () => {
    return new Promise<Array<any>>((resolve, reject) => {
        const query = `SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
                        FROM bike_erp.component c , bike_erp.component_location cl
                        WHERE c.component_id=cl.component_id`
        db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const fetchComponent = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
        FROM bike_erp.component c , bike_erp.component_location cl
        WHERE c.component_id = ? and c.component_id = cl.component_id`
        db.query(query, [id], (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const updateComponent = (id: string, quantity: string) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE component SET quantity=? WHERE component_id=?'; 
        db.query(query,[quantity, id], (err, rows) => {
            console.log(quantity);
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const updateComponentStatus = (id: string, status: Status) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE component SET status=? WHERE component_id=?'; 
        db.query(query,[status.toString(), id], (err, rows) => {
            console.log(status);
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const fetchComponentLocation = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM component_location WHERE component_id = ?'; 
        db.query(query, [id], (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const fetchComponentStatus = (id: string) => {
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM component_status WHERE component_id = ?'
        db.query(query, [id], (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}