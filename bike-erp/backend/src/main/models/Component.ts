import { Size } from "./Bike";

export class Component {
  private component_id: number;
  private price: number;
  private quantity: number;
  private size: Size;
  private component_status: Status;
  private component_type: Type;

  constructor(
    component_id: number,
    price: number,
    quantity: number,
    size: Size,
    component_status: Status,
    component_type: Type
  ) {
    this.component_id = component_id;
    this.price = price;
    this.quantity = quantity;
    this.size = size;
    this.component_status = component_status;
    this.component_type = component_type;
  }

  public getComponent_id(): number {
    return this.component_id;
  }

  public setComponent_id(component_id: number): void {
    this.component_id = component_id;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getSize(): Size {
    return this.size;
  }

  public setSize(size: Size): void {
    this.size = size;
  }

  public getComponent_status(): Status {
    return this.component_status;
  }

  public setComponent_status(component_status: Status): void {
    this.component_status = component_status;
  }

  public getComponent_type(): Type {
    return this.component_type;
  }

  public setComponent_type(component_type: Type): void {
    this.component_type = component_type;
  }
}

export enum Status {
  AVAILABLE,
  UNAVAILABLE,
  INCOMING,
}

export enum Type {
  PEDAL,
  WHEEL,
  SEAT,
  HANDLE,
  DRIVE_TRAIN,
}
