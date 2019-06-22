declare var require: any;
const uuidFunction = require('uuid/v4')

export class WineBatch {
  private numberOfBottle: number
  private name: string
  private country: string
  private year: number
  public dateAdded: number
  private vineyard: string
  public id: string

  constructor(name: string, bottleNbr: number, country: string, year: number, dateAdded: number, vineYard: string) {
    this.numberOfBottle = bottleNbr
    this.country = country
    this.name = name
    this.year = year
    this.dateAdded = dateAdded
    this.vineyard = vineYard
    this.id = uuidFunction();
  }
}