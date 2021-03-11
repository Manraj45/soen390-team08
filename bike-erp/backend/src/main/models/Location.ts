export class Location {
  private location_id: number;
  private location: string;

  constructor(location_id: number, name: string) {
    this.location_id = location_id;
    this.location = name;
  }

  public getLocation_id(): number {
    return this.location_id;
  }

  public setLocation_id(location_id: number): void {
    this.location_id = location_id;
  }

  public getLocation(): string {
    return this.location;
  }

  public setLocation(name: string): void {
    this.location = name;
  }
}
