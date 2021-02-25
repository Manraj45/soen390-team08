import { Size } from "./Bike";
import { Component, Status, Type } from "./Component";

export class Frame extends Component {
  private frame_id: number;
  private frame_type: FrameType;

  constructor(
    frame_id: number,
    frame_type: FrameType,
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
    this.frame_id = frame_id;
    this.frame_type = frame_type;
  }

  public getFrame_id(): number {
    return this.frame_id;
  }

  public setFrame_id(frame_id: number): void {
    this.frame_id = frame_id;
  }

  public getFrame_type(): FrameType {
    return this.frame_type;
  }

  public setFrame_type(frame_type: FrameType): void {
    this.frame_type = frame_type;
  }
}

export enum FrameType {
  UTILITY,
  TOURING,
  MOUNTAIN,
}
