import { JsonObjectExpression } from 'typescript';
import db from '../helpers/db';
import {Component} from '../models/Component'

export const createComponent = (component: JsonObjectExpression) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO component SET ?';
        db.query(query, component, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

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

export const updateComponent = (id: string, component: JsonObjectExpression) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE component SET ? WHERE component_id=?'; 
        db.query(query,[component, id], (err, rows) => {
            console.log(component);
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const deleteComponent = (id: string) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM component WHERE component_id=?'; 
        db.query(query, [id], (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}

export const deleteAllComponents = () => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM component'; 
        db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}