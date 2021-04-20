"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryManagementService_1 = require("../../../main/services/inventoryManagementService/InventoryManagementService");
describe("Component Fetching", () => {
    // Invalid number input for get component
    test("Get Component with Negative Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "-1223232";
        let errorMessage;
        try {
            inventoryManagementService.getComponent(id);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id");
    }));
    // Not a number input for get component
    test("Get Component with Nan Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "abc";
        let errorMessage;
        try {
            inventoryManagementService.getComponent(id);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id");
    }));
    // Invalid number input for id in edit component
    test("Edit Component with Negative Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "-1223232";
        const qty = "1";
        let errorMessage;
        try {
            inventoryManagementService.editComponent(id, qty);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id or quantity");
    }));
    // Not a number input for id in edit component
    test("Edit Component with NaN Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "abc";
        const qty = "1";
        let errorMessage;
        try {
            inventoryManagementService.editComponent(id, qty);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id or quantity");
    }));
    // Invalid number input for quantity in edit component
    test("Edit Component with Negative Quantity", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "1223232";
        const qty = "-1";
        let errorMessage;
        try {
            inventoryManagementService.editComponent(id, qty);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id or quantity");
    }));
    // Not a number input for quantity in edit component
    test("Edit Component with NaN Quantity", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "1234345";
        const qty = "-1";
        let errorMessage;
        try {
            inventoryManagementService.editComponent(id, qty);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id or quantity");
    }));
    // Invalid number input for id in get component location
    test("Get Component Location with Negative Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "-1234345";
        let errorMessage;
        try {
            inventoryManagementService.getComponentLocation(id);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id");
    }));
    // Not a number input for id in get component location
    test("Get Component Location with NaN Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryManagementService = new InventoryManagementService_1.InventoryManagementService();
        const id = "abc";
        let errorMessage;
        try {
            inventoryManagementService.getComponentLocation(id);
        }
        catch (error) {
            errorMessage = error;
        }
        expect(errorMessage.message).toEqual("Invalid id");
    }));
});
