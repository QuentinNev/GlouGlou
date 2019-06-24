import { WineBatchProvider } from '../_providers/WineBatchProvider'

export class Note {
  private wineId: string
  private value: number

  constructor(wineId: string, value: number, private wineProvider: WineBatchProvider) {
    this.wineId = wineId
    this.value = value
  }

  public getNote() {
    return this.value
  }

  public setNote(note: number) {
    this.value = note
  }

  public getWine(windId: string) {
    return this.wineProvider.getWineBatch(windId)
  }
}