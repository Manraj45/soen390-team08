import { JsonObjectExpression } from 'typescript';
import db from '../helpers/db';
import {Component} from '../models/Component'

export const fetchAllComponents = () => {
    return new Promise<Array<any>>((resolve, reject) => {
        const query = 'SELECT * FROM component'
        db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const fetchComponent = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM component WHERE component_id = ?'; 
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

export const addComponent = (component : Component) => {
    return new Promise((resolve, reject) =>{
        const query = "INSERT INTO component VALUES (?, ?, ?, ?, ? ,?)";
        db.query(query, [component.getComponent_id, component.getPrice, component.getQuantity, component.getComponent_type, component.getComponent_status, component.getSize]), (err, rows)=>{
            if(err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        }
    });
}