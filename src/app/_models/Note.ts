export class Note {
  public wineId: string
  private value: number

  constructor(wineId: string, value: number) {
    this.wineId = wineId
    this.value = value
  }

  public getNote() {
    return this.value
  }

  public setNote(note: number) {
    this.value = note
  }
}