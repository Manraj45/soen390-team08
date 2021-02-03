import { JsonObjectExpression } from 'typescript';
import {createComponent, fetchAllComponents, fetchComponent, updateComponent, deleteComponent, deleteAllComponents} from '../../dao/ComponentDAO';
import {Component} from '../../models/Component';

export class InventoryManagementService {
    public addComponent = (component: JsonObjectExpression) => {
        return createComponent(component);
    }

    public getAllComponents = () => {
        return fetchAllComponents();
    }

    public getComponent = (id: string) => {
        return fetchComponent(id);
    }

    public editComponent = (id: string, component: JsonObjectExpression) => {
        return updateComponent(id, component);
    }

    public removeComponent = (id: string) => {
        return deleteComponent(id);
    }

    public removeAllComponents = () => {
        return deleteAllComponents();
    }
}
