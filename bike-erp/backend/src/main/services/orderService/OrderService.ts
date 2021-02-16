import * as ComponentDAO from '../../dao/ComponentDAO'
import {Component, Status} from '../../models/Component'

export class OrderService {
    public getAllComponents = () =>{
        return ComponentDAO.fetchAllComponents();
    }
    
    public getComponent = (id : string) =>{
        return ComponentDAO.fetchComponent(id);
    }

    private setComponentQuantity = (id : string, quantity: string) =>{
        return ComponentDAO.updateComponent(id, quantity);
    }

    private setComponentStatus = (id: string, status: Status) =>{
        return ComponentDAO.updateComponentStatus(id, status);
    }

    public getComponentStatus = (id: string) =>{
        return ComponentDAO.fetchComponentStatus(id);
    }

    public setComponent = async (id: string, quantity: string) =>{
        const currentStatus = await this.getComponentStatus(id);
        switch (currentStatus){
            case 'AVAILABLE':
                if(parseInt(quantity) == 0){
                    this.setComponentStatus(id, Status.UNAVAILABLE);
                }
            case 'UNAVAILABLE':
                if(parseInt(quantity) > 0){
                    this.setComponentStatus(id, Status.AVAILABLE);
                }
        }
        return this.setComponentQuantity(id, quantity);
    }
}