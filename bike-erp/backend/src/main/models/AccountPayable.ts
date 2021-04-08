export class AccountPayable {
  private account_payable_id: number;
  private account_id: number;
  private payable_date: Date;
  private total: number;
  
  constructor(
    account_payable_id: number,
    account_id: number,
    payable_date: Date,
    total: number
  ) {
    this.account_payable_id = account_payable_id;
    this.account_id = account_id;
    this.payable_date = payable_date;
    this.total = total;
  }

  public getAccount_payable_id(): number {
    return this.account_payable_id;
  }

  public setAccount_payable_id(account_payable_id: number): void {
    this.account_payable_id = account_payable_id;
  }

  public getAccount_id(): number {
    return this.account_id;
  }

  public setAccount_id(account_id: number): void {
    this.account_id = account_id;
  }

  public getPayable_date(): Date {
    return this.payable_date;
  }

  public setPayable_date(payable_date: Date): void {
    this.payable_date = payable_date;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void {
    this.total = total;
  }
}
