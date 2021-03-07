import {
  fetchAllComponents,
  fetchComponent,
  updateComponent,
  fetchComponentLocation,
} from "../../dao/ComponentDAO";

export class InventoryManagementService {
  // retrieve all components from stored in the table
  public getAllComponents = () => {
    return fetchAllComponents();
  };

  // retrieve components identified with a unique id
  public getComponent = (id: string) => {
    const idAsNum: number = Number(id);
    if (isNaN(idAsNum) || idAsNum < 0) {
      throw { status: 400, message: "Invalid id" };
    }

    return fetchComponent(id);
  };

  // edit the quantity of a specific component identified by a unique id number
  public editComponent = (id: string, quantity: string) => {
    const idAsNum: number = Number(id);
    const qtyAsNum: number = Number(quantity);
    if (isNaN(idAsNum) || isNaN(qtyAsNum) || qtyAsNum < 0 || idAsNum < 0) {
      throw { status: 400, message: "Invalid id or quantity" };
    }

    return updateComponent(id, quantity);
  };

  // edits the quantity of components based on order list provided
  public orderComponents = (orderList: Array<any>) => {
    return new Promise(async (resolve, rejects) => {
      orderList.forEach(order => {
        this.editComponent(order.id, order.quantity).catch(error => {
          rejects(error)
        })
      })

      resolve({ status: 201, message: "Components have been ordered successfully" })
    })
  }

  // get the location of a component identified by a unique id
  public getComponentLocation = (id: string) => {
    const idAsNum: number = Number(id);

    if (isNaN(idAsNum) || idAsNum < 0) {
      throw { status: 400, message: "Invalid id" };
    }

    return fetchComponentLocation(id);
  };
}
