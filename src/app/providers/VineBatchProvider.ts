import { Storage } from '@ionic/storage'
import { VineBatch } from '../models/VineBatch'

export class VineBatchProvider {
  private storage: Storage
  private storageKey: string
  constructor(storage: Storage) {
    this.storage = storage
    this.storageKey = "batches"
  }

  public async addVineBatch(vineBatch: VineBatch) {
    let batches = await this.getVineBatches()
    batches = [...batches, vineBatch]
    this.storage.set(this.storageKey, batches)
  }

  public async removeVineBatch(id) {
    let batches = await this.getVineBatches()
    batches = batches.filter(function (batch) {
      return batch.uuid !== id
    })
    this.storage.set(this.storageKey, batches)
  }

  // Returns a promise, use in an async function !
  public getVineBatches() {
    return this.storage.get(this.storageKey)
  }

  public setVineBatch() {
    // Generate key with name and year or more infos
    this.storage.set(this.storageKey, [new VineBatch("Chat tout neuf du Pape", 5000, 'Moldavie', 1404, Date.now(), "Vignoble personange")])
  }
}