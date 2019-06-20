import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastUpdateService {
  public lastUpdate: number
  public lastTry: boolean
}
