import { Storage } from '@ionic/storage'
import { WineBatch } from '../_models/WineBatch'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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

    // Get api url
    this.settings.getSettings().then(settings => {
      this.apiUrl = settings['apiUrl']
    })
  }

  //#region API

  /**
   * Refresh wines list in storage
   */
  public refreshWineBatches() {
    this.settings.getSettings().then(settings => {
      this.apiUrl = settings['apiUrl'] // Update api url
      this.getLocalWines().then(localWines => {
        this.httpClient.get(this.apiUrl + 'wines').subscribe(result => {
          // if there's locally created wines add them to those which come from api
          let wines = (localWines && localWines.length > 0) ? [...result['data'], ...localWines] : result['data']
          this.setWineBatches(wines)

          // Update last successful update status
          this.lup.lastTry = true
          this.lup.lastUpdate = `Last successful update : ${new Date().toString()}`
        }, error => {
          // Update last successful update status
          this.lup.lastTry = false
          this.toaster.showToast("Couldn't refresh wines")
        })

      })
    })
  }

  //#endregion

  //#region localstorage

  /**
   * Add locally a wine
   * @param wineBatch new wine to add
   */
  public async addLocalWineBatch(wineBatch: WineBatch) {
    let batches = await this.getWineBatches()
    batches = batches ? [...batches, wineBatch] : [wineBatch]
    this.storage.set(this.storageKey, batches)
  }

  /**
   * 
   * @param batches complete list of all wines to store
   */
  public async setWineBatches(batches: any) {
    this.storage.set(this.storageKey, batches)
  }

  /**
   * Reset all stored wines, for debug purposes
   */
  public clearStorage() {
    this.storage.set(this.storageKey, [])
  }

  /**
   * 
   * @param id of wine to remove
   */
  public async removeWineBatch(id) {
    let batches = await this.getWineBatches()
    if (batches) {
      batches = batches.filter(function (batch) {
        return batch.id != id
      })
      this.storage.set(this.storageKey, batches)
    }
  }

  /**
   * Returns a promise !
   */
  public getWineBatches() {
    return this.storage.get(this.storageKey)
  }

  /**
   * Returns all locally created wines by check if they have the 'local' attribute
   */
  private getLocalWines() {
    return this.getWineBatches().then(async wines => {
      if (wines) return wines.filter(wine => wine['local'])
    })
  }

  /**
   * Returns a single wine
   * @param id of wine to get
   */
  public getWineBatch(id) {
    return this.storage.get(this.storageKey).then(batches => {
      return batches.find(element => {
        return element.id == id
      })
    })
  }

  //#endregion
}