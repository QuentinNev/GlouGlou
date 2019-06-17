import { Storage } from '@ionic/storage'
import { WineBatch } from '../_models/WineBatch'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ObservableResult } from '../_models/ObservableResult'

@Injectable()
export class WineBatchProvider {
  private storage: Storage
  private storageKey: string
  private apiUrl: string

  constructor(storage: Storage, private httpClient: HttpClient) {
    this.storage = storage
    this.storageKey = "batches"
    this.apiUrl = 'http://localhost:8000/api/qns/'
  }

  //#region API

  public refreshWineBatches() {
    this.httpClient.get(this.apiUrl + 'wines').subscribe(result => {
      let observableResult = new ObservableResult(result)
      this.setWineBatches(observableResult.data)
    }, error => {
      console.error(error)
    })
  }

  public addWineBatch(data: any) {
    //debugger
    console.log("Sending data")
    this.httpClient.post(this.apiUrl + 'wines', data, { observe: 'response' }).subscribe(res => {
      console.log("got response !")
    }, error => {
      console.error("error")
    })
    console.log("Data sent !")
  }

  //#endregion

  //#region localstorage

  public async addLocalWineBatch(wineBatch: WineBatch) {
    let batches = await this.getWineBatches()
    batches = batches ? [...batches, wineBatch] : [wineBatch]
    this.storage.set(this.storageKey, batches)
    this.addWineBatch(wineBatch)
  }

  public async setWineBatches(batches: any) {
    this.storage.set(this.storageKey, batches)
  }

  public clearStorage() {
    this.storage.set(this.storageKey, [])
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

  //#endregion
}