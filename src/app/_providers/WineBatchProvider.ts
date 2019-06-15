import { Storage } from '@ionic/storage'
import { WineBatch } from '../_models/WineBatch'
import { Injectable } from '@angular/core'

@Injectable()
export class WineBatchProvider {
  private storage: Storage
  private storageKey: string
  constructor(storage: Storage) {
    this.storage = storage
    this.storageKey = "batches"
  }

  public async addWineBatch(wineBatch: WineBatch) {
    let batches = await this.getWineBatches()
    batches = batches ? [...batches, wineBatch] : [wineBatch]
    this.storage.set(this.storageKey, batches)
  }

  public async removeWineBatch(uuid) {
    let batches = await this.getWineBatches()
    if (batches) {
      batches = batches.filter(function (batch) {
        return batch.uuid !== uuid
      })
      this.storage.set(this.storageKey, batches)
    }
  }

  // Returns a promise, use in an async function !
  public getWineBatches() {
    return this.storage.get(this.storageKey)
  }

  public getWineBatch(uuid: string) {
    return this.storage.get(this.storageKey).then(batches => {
      return batches.find(element => {
        return element.uuid === uuid
      })
    })
  }
}