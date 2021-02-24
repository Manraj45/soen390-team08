import db from '../helpers/db';

export const fetchAllComponents = () => {
    return new Promise<Array<any>>((resolve, reject) => {
        const query = `SELECT c.price, c.quantity, c.component_type, c.component_status, c.size, c.specificComponentType, cl.component_id, cl.location_name 
                        FROM component c , component_location cl
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
        FROM component c , component_location cl
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
        db.query(query, [quantity, id], (err, rows) => {
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
