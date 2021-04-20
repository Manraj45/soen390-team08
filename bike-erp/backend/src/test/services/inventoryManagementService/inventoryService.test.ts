import { InventoryManagementService } from "../../../main/services/inventoryManagementService/InventoryManagementService";

describe("Component Fetching", () => {
  // Invalid number input for get component
  test("Get Component with Negative Id", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "-1223232";
    let errorMessage: any;

    try {
      inventoryManagementService.getComponent(id);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id");
  });

  // Not a number input for get component
  test("Get Component with Nan Id", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "abc";
    let errorMessage: any;

    try {
      inventoryManagementService.getComponent(id);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id");
  });

  // Invalid number input for id in edit component
  test("Edit Component with Negative Id", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "-1223232";
    const qty: string = "1";
    let errorMessage: any;

    try {
      inventoryManagementService.editComponent(id, qty);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id or quantity");
  });

  // Not a number input for id in edit component
  test("Edit Component with NaN Id", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "abc";
    const qty: string = "1";
    let errorMessage: any;

    try {
      inventoryManagementService.editComponent(id, qty);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id or quantity");
  });

  // Invalid number input for quantity in edit component
  test("Edit Component with Negative Quantity", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "1223232";
    const qty: string = "-1";
    let errorMessage: any;

    try {
      inventoryManagementService.editComponent(id, qty);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id or quantity");
  });

  // Not a number input for quantity in edit component
  test("Edit Component with NaN Quantity", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "1234345";
    const qty: string = "-1";
    let errorMessage: any;

    try {
      inventoryManagementService.editComponent(id, qty);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id or quantity");
  });

  // Invalid number input for id in get component location
  test("Get Component Location with Negative Id", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "-1234345";
    let errorMessage: any;

    try {
      inventoryManagementService.getComponentLocation(id);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id");
  });

  // Not a number input for id in get component location
  test("Get Component Location with NaN Id", async () => {
    const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    const id: string = "abc";
    let errorMessage: any;

    try {
      inventoryManagementService.getComponentLocation(id);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toEqual("Invalid id");
  });
});
