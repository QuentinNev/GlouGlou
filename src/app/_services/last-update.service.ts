/**
 * This service provides connection status everywhere in the app
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastUpdateService {
  public lastUpdate: string
  public lastTry: boolean

  public getState() {
    return (this.lastTry) ? "Online" : "Offline"
  }
}
