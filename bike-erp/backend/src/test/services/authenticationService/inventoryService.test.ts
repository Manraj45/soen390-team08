import { InventoryManagementService } from '../../../main/services/inventoryManagementService/InventoryManagementService';
import dotenv from 'dotenv';
import db from '../../../main/helpers/db';

describe("Component Fetching", () =>{
    // beforeAll(async () => {
    //     const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
    // })

    // afterAll(() => {
    //     //Closing connection to database
    //     db.end();
    // })

    test("getAllComponents", async() =>  {
        const inventoryManagementService: InventoryManagementService = new InventoryManagementService();
        const test = await inventoryManagementService.getAllComponents();
        
        expect(test).toHaveBeenCalled();
    })

    
})