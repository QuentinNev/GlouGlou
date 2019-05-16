import { Storage } from '@ionic/storage'
import { VineBatch } from '../models/VineBatch'

class VineBatchProvider {
  private stroage: Storage
  constructor(storage: Storage) {
    this.stroage = storage
  }

  public addVineBatch(vineBatch: VineBatch) {

  }

  public removeVineBatch(id) {

  }

  public getVineBatches() {

  }

  public setVineBatches() {

  }
}