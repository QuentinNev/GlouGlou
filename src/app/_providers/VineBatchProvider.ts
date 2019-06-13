import { Storage } from '@ionic/storage'
import { VineBatch } from '../_models/VineBatch'
import { Injectable } from '@angular/core'

@Injectable()
export class VineBatchProvider {
  private storage: Storage
  private storageKey: string
  constructor(storage: Storage) {
    this.storage = storage
    this.storageKey = "batches"
  }

  public async addVineBatch(vineBatch: VineBatch) {
    let batches = await this.getVineBatches()
    batches = batches ? [...batches, vineBatch] : [vineBatch]
    this.storage.set(this.storageKey, batches)
  }

  public async removeVineBatch(uuid) {
    let batches = await this.getVineBatches()
    if (batches) {
      batches = batches.filter(function (batch) {
        return batch.uuid !== uuid
      })
      this.storage.set(this.storageKey, batches)
    }
  }

  // Returns a promise, use in an async function !
  public getVineBatches() {
    return this.storage.get(this.storageKey)
  }

  public getVineBatch(uuid: string) {
    return this.storage.get(this.storageKey).then(batches => {
      return batches.find(element => {
        return element.uuid === uuid
      })
    })
  }
}