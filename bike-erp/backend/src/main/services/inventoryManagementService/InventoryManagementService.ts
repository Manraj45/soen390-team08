import { JsonObjectExpression } from 'typescript';
import {fetchAllComponents, fetchComponent, updateComponent, fetchComponentLocation} from '../../dao/ComponentDAO';
import {Component} from '../../models/Component';

export class InventoryManagementService {

    public getAllComponents = () => {
        return fetchAllComponents();
    }

    public getComponent = (id: string) => {
        const idAsNum : number = Number(id);
         if(isNaN(idAsNum) || idAsNum < 0){
            throw { status: 400, message: "Invalid id" };
         }
        
        return fetchComponent(id);
    }

    public editComponent = (id: string, quantity: string) => {
        const idAsNum : number = Number(id);
        const qtyAsNum : number = Number(quantity);
        if(isNaN(idAsNum) || isNaN(qtyAsNum) || qtyAsNum < 0 ||idAsNum < 0){
            throw { status: 400, message: "Invalid id or quantity" };
        }

        return updateComponent(id, quantity);
    }

    public getComponentLocation = (id: string) => {
        const idAsNum : number = Number(id);

        if(isNaN(idAsNum) || idAsNum < 0){
            throw { status: 400, message: "Invalid id" };
        }

        return fetchComponentLocation(id);
    }

}
