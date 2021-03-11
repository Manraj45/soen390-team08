import { Size } from "./Bike";
import { Component, Status, Type } from "./Component";

export class DriveTrain extends Component {
  private drive_train_id: number;
  private drive_train_type: DriveTrainType;

  constructor(
    drive_train_id: number,
    drive_train_type: DriveTrainType,
    component_id: number,
    price: number,
    quantity: number,
    size: Size,
    component_status: Status,
    component_type: Type
  ) {
    super(
      component_id,
      price,
      quantity,
      size,
      component_status,
      component_type
    );
    this.drive_train_id = drive_train_id;
    this.drive_train_type = drive_train_type;
  }

  public getDrive_train_id(): number {
    return this.drive_train_id;
  }

  public setDrive_train_id(drive_train_id: number): void {
    this.drive_train_id = drive_train_id;
  }

  public getDrive_train_type(): DriveTrainType {
    return this.drive_train_type;
  }

  public setDrive_train_type(drive_train_type: DriveTrainType): void {
    this.drive_train_type = drive_train_type;
  }
}

export enum DriveTrainType {
  NOVICE,
  INTERMEDIATE,
  ADVANCED,
  EXPERT,
}
