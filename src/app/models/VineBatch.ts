const uuid = require('uuid/v4')

export class VineBatch {
  private bottleNumber: number
  private name: string
  private country: string
  private year: number
  private dateAdded: number
  private vineYard: string
  private uniqueID: string

  constructor(name: string, bottleNbr: number, country: string, year: number, dateAdded: number, vineYard: string) {
    this.bottleNumber = bottleNbr
    this.country = country
    this.name = name
    this.year = year
    this.dateAdded = dateAdded
    this.vineYard = vineYard
    this.uniqueID = uuid();
  }
}