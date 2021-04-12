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
exports.InventoryManagementService = void 0;
const ComponentDAO_1 = require("../../dao/ComponentDAO");
const AccountingService_1 = require("../accountingService/AccountingService");
const emailService_1 = require("../emailService/emailService");
const TriggerService_1 = require("../triggerService/TriggerService");
class InventoryManagementService {
    constructor() {
        // Retrieve all components from stored in the table
        this.getAllComponents = () => {
            return ComponentDAO_1.fetchAllComponents();
        };
        // Retrieve components identified with a unique id
        this.getComponent = (id) => {
            const idAsNum = Number(id);
            if (isNaN(idAsNum) || idAsNum < 0) {
                throw { status: 400, message: "Invalid id" };
            }
            return ComponentDAO_1.fetchComponent(id);
        };
        //Add component type
        this.addComponent = (price, quantity, component_type, component_status, size, specificComponentType, location_name) => {
            return ComponentDAO_1.insertNewComponent(price, quantity, component_type, component_status, size, specificComponentType, location_name);
        };
        // Edit the quantity of a specific component identified by a unique id number
        this.editComponent = (id, quantity) => {
            const idAsNum = Number(id);
            const qtyAsNum = Number(quantity);
            if (isNaN(idAsNum) || isNaN(qtyAsNum) || qtyAsNum < 0 || idAsNum < 0) {
                throw { status: 400, message: "Invalid id or quantity" };
            }
            return ComponentDAO_1.updateComponent(id, quantity);
        };
        // Edit component quantity when used to build a bike that was sold
        this.editComponentQuantitySale = (componentSaleList) => {
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
        this.orderComponents = (orderList, userEmail) => {
            return new Promise((resolve, rejects) => {
                const updateQuantityInDB = new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
                    orderList.forEach((order) => {
                        this.editComponent(order.id, order.quantity + order.selectedQuantity).catch((error) => {
                            rejects(error);
                        });
                    });
                    const triggerService = new TriggerService_1.TriggerService();
                    triggerService.getCurrentTriggers(userEmail).then((response) => __awaiter(this, void 0, void 0, function* () {
                        const triggers = response;
                        if (triggers[0].COMPONENT_ORDER) {
                            // send email to confirm
                            console.log(response);
                            yield emailService_1.EmailService.email(userEmail, "Component Order Confirmation", "You have sucessfully ordered a component from Bike King Inc. Thank you for your purchase.").catch((error) => { console.log("An error has occured sending the email"); });
                        }
                    }))
                        .catch((error) => {
                    });
                    resolve({ status: 201, message: "Components have been ordered successfully" });
                }));
                updateQuantityInDB
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    const response = yield AccountingService_1.AccountingService.createAccountPayable(orderList, userEmail);
                    resolve(response);
                }))
                    .catch((error) => {
                    rejects(error);
                });
            });
        };
        // Get the location of a component identified by a unique id
        this.getComponentLocation = (id) => {
            const idAsNum = Number(id);
            if (isNaN(idAsNum) || idAsNum < 0) {
                throw { status: 400, message: "Invalid id" };
            }
            return ComponentDAO_1.fetchComponentLocation(id);
        };
        //Get all the types of components
        this.getComponentTypes = (location, size) => {
            return ComponentDAO_1.fetchComponentTypes(location, size);
        };
        this.getAllLocations = () => {
            return ComponentDAO_1.fetchAllLocations();
        };
        AccountingService_1.AccountingService.getAccountingService();
    }
}
exports.InventoryManagementService = InventoryManagementService;
