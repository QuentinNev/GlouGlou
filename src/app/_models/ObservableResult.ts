/*
    The only prupose of this object is to avoid errors on compilation by
    having a data attribute
*/
export class ObservableResult {
  public data: Array<any>

  constructor(result: any) {
    this.data = result.data
  }
}