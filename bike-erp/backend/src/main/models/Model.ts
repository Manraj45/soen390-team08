export class Model {

    private model_id: number
    private model_name: string

    constructor(model_id: number, model_name: string) {
        this.model_id = model_id
        this.model_name = model_name
    }
    public getModel_id(): number {
        return this.model_id;
    }

    public setModel_id(model_id: number): void {
        this.model_id = model_id;
    }

    public getModel_name(): string {
        return this.model_name;
    }

    public setModel_name(model_name: string): void {
        this.model_name = model_name;
    }
}