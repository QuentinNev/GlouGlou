/**
 * This service provides and store all app settings
 */

import { Storage } from '@ionic/storage'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private storage: Storage
  private storageKey: string

  constructor(storage: Storage) {
    this.storage = storage
    this.storageKey = "settings"
  }

  public getSettings() {
    return this.storage.get(this.storageKey)
  }

  public setTheme(theme: string) {
    this.getSettings().then(settings => {
      if (settings) {
        settings['theme'] = theme
        this.storage.set(this.storageKey, settings)
        console.log("Updated theme")
      } else {
        this.storage.set(this.storageKey, { apiUrl: "http://localhost:8000/api/qns/", theme: theme })
        console.log("First theme")
      }
    })
  }

  public setApiUrl(apiUrl: string) {
    this.getSettings().then(settings => {
      if (settings) {
        settings['apiUrl'] = apiUrl
        this.storage.set(this.storageKey, settings)
        console.log("Updated apiUrl")
      } else {
        this.storage.set(this.storageKey, { apiUrl: apiUrl, theme: "neon" })
        console.log("stored apiUrl")
      }
    })
  }
}
