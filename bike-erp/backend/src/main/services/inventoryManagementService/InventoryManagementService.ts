import { fetchAllComponents, fetchComponent, updateComponent, fetchComponentLocation } from '../../dao/ComponentDAO';

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

    public getComponentLocation = (id: string) => {
        return fetchComponentLocation(id);
    }

}