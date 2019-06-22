import { Storage } from '@ionic/storage'
import { WineBatch } from '../_models/WineBatch'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ObservableResult } from '../_models/ObservableResult'
import { LastUpdateService } from '../_services/last-update.service';
import { ToasterService } from '../_services/toaster.service'
import { SettingsService } from '../_services/settings.service';

@Injectable()
export class WineBatchProvider {
  private storageKey: string
  private apiUrl: string

  constructor(
    private storage: Storage,
    private httpClient: HttpClient,
    private lup: LastUpdateService,
    private toaster: ToasterService,
    private settings: SettingsService
  ) {
    this.storageKey = "batches"
    this.settings.getSettings().then(settings => {
      this.apiUrl = settings['apiUrl']
    })
  }

  //#region API

  public refreshWineBatches() {
    this.settings.getSettings().then(settings => {
      this.apiUrl = settings['apiUrl']

      this.httpClient.get(this.apiUrl + 'wines').subscribe(result => {
        console.log(result['data'])

        let observableResult = new ObservableResult(result)
        this.setWineBatches(observableResult.data)

        this.lup.lastTry = true
        this.lup.lastUpdate = `Last successful update : ${new Date().toString()}`
      }, error => {
        this.lup.lastTry = false
        this.toaster.showToast("Couldn't refresh wines")
      })
    })
  }

  //#endregion

  //#region localstorage

  public async addLocalWineBatch(wineBatch: WineBatch) {
    let batches = await this.getWineBatches()
    batches = batches ? [...batches, wineBatch] : [wineBatch]
    this.storage.set(this.storageKey, batches)
  }

  public async setWineBatches(batches: any) {
    this.storage.set(this.storageKey, batches)
  }

  public clearStorage() {
    this.storage.set(this.storageKey, [])
  }

  public async removeWineBatch(id) {
    let batches = await this.getWineBatches()
    if (batches) {
      batches = batches.filter(function (batch) {
        return batch.id != id
      })
      this.storage.set(this.storageKey, batches)
    }
  }

  // Returns a promise, use in an async function !
  public getWineBatches() {
    return this.storage.get(this.storageKey)
  }

  public getWineBatch(id) {
    return this.storage.get(this.storageKey).then(batches => {
      return batches.find(element => {
        return element.id == id
      })
    })
  }

  //#endregion
}