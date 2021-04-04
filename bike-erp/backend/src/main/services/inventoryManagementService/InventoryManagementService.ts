import {
  fetchAllComponents,
  fetchComponent,
  updateComponent,
  fetchComponentLocation,
  fetchComponentTypes,
} from "../../dao/ComponentDAO";
import { AccountingService } from "../accountingService/AccountingService";

export class InventoryManagementService {
  private static accountingService: AccountingService | undefined;

  public constructor() {
    AccountingService.getAccountingService();
  }
  // Retrieve all components from stored in the table
  public getAllComponents = () => {
    return fetchAllComponents();
  };

  // Retrieve components identified with a unique id
  public getComponent = (id: string) => {
    const idAsNum: number = Number(id);
    if (isNaN(idAsNum) || idAsNum < 0) {
      throw { status: 400, message: "Invalid id" };
    }

    return fetchComponent(id);
  };

  // Edit the quantity of a specific component identified by a unique id number
  public editComponent = (id: string, quantity: string) => {
    const idAsNum: number = Number(id);
    const qtyAsNum: number = Number(quantity);
    if (isNaN(idAsNum) || isNaN(qtyAsNum) || qtyAsNum < 0 || idAsNum < 0) {
      throw { status: 400, message: "Invalid id or quantity" };
    }
    return updateComponent(id, quantity);
  };

  // Edit component quantity when used to build a bike that was sold
  public editComponentQuantitySale = (componentSaleList: Array<any>) => {
    return new Promise((resolve, rejects) => {
      componentSaleList.forEach((component) => {
        this.editComponent(component.id, component.quantity).catch((error) => {
          rejects(error);
        });
      });
      resolve({
        status: 201,
        message: "Components have been sold succesfully",
      });
    });
  };

  // Edits the quantity of components based on order list provided
  public orderComponents = (orderList: Array<any>, userEmail: string) => {
    return new Promise((resolve, rejects) => {
      const updateQuantityInDB = new Promise(async (resolve, rejects) => {
        orderList.forEach((order) => {
          this.editComponent(order.id, order.quantity).catch((error) => {
            rejects(error);
          });
        });
        resolve({
          status: 201,
          message: "Components have been ordered successfully",
        });
      });

      updateQuantityInDB
        .then(async () => {
          const response = await AccountingService.createAccountPayable(
            orderList,
            userEmail
          );
          resolve(response);
        })
        .catch((error) => {
          rejects(error);
        });
    });
  };

  // Get the location of a component identified by a unique id
  public getComponentLocation = (id: string) => {
    const idAsNum: number = Number(id);

    if (isNaN(idAsNum) || idAsNum < 0) {
      throw { status: 400, message: "Invalid id" };
    }

    return fetchComponentLocation(id);
  };

  //Get all the types of components
  public getComponentTypes = (location: string, size: string) => {
    return fetchComponentTypes(location, size);
  };
}
