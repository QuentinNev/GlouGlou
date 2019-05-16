import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VineBatchProvider } from '../providers/VineBatchProvider';
import { VineBatch } from '../models/VineBatch';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private vineBatchProvider: VineBatchProvider
  private vineBatch: VineBatch

  constructor(private storage: Storage) {
    this.vineBatchProvider = new VineBatchProvider(this.storage)
    this.vineBatch = null
  }

  public setVineBatch() {
    this.vineBatchProvider.setVineBatches()
  }

  public async getVineBatch() {
    this.vineBatch = await this.vineBatchProvider.getVineBatches()
  }
}
