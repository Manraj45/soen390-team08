import { JsonObjectExpression } from 'typescript';
import {fetchAllComponents, fetchComponent, updateComponent} from '../../dao/ComponentDAO';
import {Component} from '../../models/Component';

export class InventoryManagementService {

    public getAllComponents = () => {
        return fetchAllComponents();
    }

    public getComponent = (id: string) => {
        return fetchComponent(id);
    }

    public editComponent = (id: string, quantity: string) => {
        return updateComponent(id, quantity);
    }

}