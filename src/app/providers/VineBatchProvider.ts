import { Storage } from '@ionic/storage'
import { VineBatch } from '../models/VineBatch'

export class VineBatchProvider {
  private storage: Storage
  constructor(storage: Storage) {
    this.storage = storage
  }

  public addVineBatch(vineBatch: VineBatch) {

  }

  public removeVineBatch(id) {

  }

  // Returns a promise, use in an async function !
  public getVineBatches() {
    return this.storage.get('defaultName')
  }

  public setVineBatches() {

  }

  public setVineBatche() {
    // Generate key with name and year or more infos
    this.storage.set("defaultName", new VineBatch("Chat tout neuf du Pape", 5000, 'Moldavie', 1404, Date.now(), "Vignoble personange"))
  }
}