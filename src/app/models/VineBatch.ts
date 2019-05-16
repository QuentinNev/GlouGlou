export class VineBatch {
  private bottleNumber: number
  private name: string
  private country: string
  private year: number
  private dateAdded: Date

  constructor(name: string, bottleNbr: number, country: string, year: number, dateAdded: Date) {
    this.bottleNumber = bottleNbr
    this.country = country
    this.name = name
    this.year = year
    this.dateAdded = dateAdded
  }
}