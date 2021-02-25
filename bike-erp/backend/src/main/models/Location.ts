export class Location {

    private location_id: number
    private component_name: string

    constructor(location_id: number, name: string) {
        this.location_id = location_id
        this.component_name = name
    }

    public getLocation_id(): number {
        return this.location_id;
    }

    public setLocation_id(location_id: number): void {
        this.location_id = location_id;
    }

    public getName(): string {
        return this.component_name;
    }

    public setName(name: string): void {
        this.component_name = name;
    }
}