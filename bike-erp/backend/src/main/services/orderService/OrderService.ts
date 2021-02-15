import * as ComponentDAO from '../../dao/ComponentDAO'
import {Component} from '../../models/Component'

export class OrderService {
    public getAllComponents = () =>{
        return ComponentDAO.fetchAllComponents();
    }
    
    public getComponent = (id : string) =>{
        return ComponentDAO.fetchComponent(id);
    }

    public setComponent = (id : string, quantity) =>{
        return ComponentDAO.updateComponent(id, quantity);
    }

    public addComponent = (component : Component) =>{
        return ComponentDAO.addComponent(component);
    }
}