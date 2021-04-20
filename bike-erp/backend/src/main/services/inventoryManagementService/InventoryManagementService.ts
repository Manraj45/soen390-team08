import {
  fetchAllComponents,
  fetchComponent,
  updateComponent,
  fetchComponentLocation,
  fetchComponentTypes,
  fetchAllLocations,
  insertNewComponent,
  fetchComponentsByLocation,
} from "../../dao/ComponentDAO";
import { AccountingService } from "../accountingService/AccountingService";
import { EmailService } from "../emailService/emailService";
import { TriggerService } from "../triggerService/TriggerService";

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

  //Add component type
  public addComponent = (price: string, quantity: string, component_type: string, component_status: string, size: string, specificComponentType: string, location_name: string) => {
    return insertNewComponent(price, quantity, component_type, component_status, size, specificComponentType, location_name);
  }

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
          this.editComponent(order.id, order.quantity + order.selectedQuantity).catch((error) => {
            rejects(error);
          })
        })

      const triggerService : TriggerService = new TriggerService();
      triggerService.getCurrentTriggers(userEmail).then(async (response) =>{
        const triggers : any[] = response;
        if(triggers[0].COMPONENT_ORDER){
          // send email to confirm
          console.log(response);
         await EmailService.email(userEmail, "Component Order Confirmation", "You have sucessfully ordered a component from Bike King Inc. Thank you for your purchase.").catch((error)=>{ console.log("An error has occured sending the email")});
        }
      })
      .catch((error) => {
      })
         
        resolve({ status: 201, message: "Components have been ordered successfully" });
      })
      
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

  // Get all the types of components
  public getComponentTypes = (location: string, size: string) => {
    return fetchComponentTypes(location, size);
  };

  // Get all locations
  public getAllLocations = ()=> {
    return fetchAllLocations();
  }

  // Get all components for a s pecified location
  public getComponentsByLocation = (location: any) => {
    return fetchComponentsByLocation(location);
  }
}
